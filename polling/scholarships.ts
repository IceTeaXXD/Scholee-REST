import { PrismaClient, Role } from "@prisma/client"
import { getAllScholarship, setScholarshipREST } from "../templates/scholarship"
import { setAcceptanceScholarshipIDREST } from "../templates/scholarshipAcceptance"
import dotenv from "dotenv"

const xml2js = require("xml2js")
const soapRequest = require("easy-soap-request")
const util = require("util")
const prisma = new PrismaClient()
const fetch = require('node-fetch');

dotenv.config()

export const scholarshipsSync = async () => {
    try{
        const { response } = await soapRequest({
            url: getAllScholarship.url,
            headers: getAllScholarship.headers,
            xml: getAllScholarship.body
        })

        const { body } = response
        
        const parser = new xml2js.Parser()
        const parsedBody = await parser.parseStringPromise(body)
        const scholarships =
            parsedBody["S:Envelope"]["S:Body"][0][
                "ns2:getAllScholarshipResponse"
            ][0]["return"]
        
        const url = process.env.MONOLITH_URL + "/api/scholarship/getAllScholarships.php"
        const scholarshipsMonolith = await fetch(url);
        const scholarshipsJSON = await scholarshipsMonolith.json();

        /* For each elements in scholarships, if the value of scholarship_id_rest = -1, then
         * get the data from scholarshipsJSON, create it in prisma and then submit it */

        for(const scholarship of scholarships){
            if(scholarship.scholarship_id_rest[0] == -1){
                /* Find the data in scholarshipsJSON */
                const data = scholarshipsJSON.find((sch: any) => {
                    return sch.user_id == scholarship.user_id_scholarship_php[0] && sch.scholarship_id == scholarship.scholarship_id_php[0];
                })

                /* Create the Scholarship */
                /* If this fails, it is ok. Rollback the commit and skip to the next iteration */
                const newScholarship = await prisma.scholarship.create(
                    {
                        data:{
                            title: data.title,
                            description: data.description,
                            short_description: data.short_description,
                            coverage: data.coverage,
                            contact_name: data.contact_name,
                            contact_email: data.contact_email,
                            organization_id: Number(scholarship.user_id_scholarship_rest[0])
                        }
                    }
                )

                await soapSync(scholarship, newScholarship)

                const { body } = response

                const parser = new xml2js.Parser()
                const parsedBody = await parser.parseStringPromise(body)
                const result =
                parsedBody["S:Envelope"]["S:Body"][0][
                    "ns2:setRESTscholarshipIDResponse"
                ][0]["return"]
            }
        }

        console.log("🟢[SCHOLARSHIP] Scholarship Sync Success");

    }catch (error: any){
        console.error("🛑[SCHOLARSHIP]Failed to Synchronize Scholarships");
    }
}

const soapSync = async (scholarship: any, newScholarship: any) => {
     /* Insert into SOAP */
     const { response } = await soapRequest(
        {
            url: setScholarshipREST.url,
            headers: setScholarshipREST.headers,
            xml: util.format(setScholarshipREST.body, scholarship.user_id_scholarship_php[0],
                scholarship.scholarship_id_php[0], scholarship.user_id_scholarship_rest[0],
                newScholarship.scholarship_id)
        }
    )

    /* If scholarship already has acceptance, update the scholarship_id_rest in SOAP */
    const { res } = await soapRequest(
        {
            url: setAcceptanceScholarshipIDREST.url,
            headers: setAcceptanceScholarshipIDREST.headers,
            xml: util.format(setAcceptanceScholarshipIDREST.body, scholarship.user_id_scholarship_php[0],
                scholarship.scholarship_id_php[0], newScholarship.scholarship_id)
        }
    )
}