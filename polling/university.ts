import { getAllUniversities, createUniversity } from "../templates/university";
import { PrismaClient, Role } from "@prisma/client";
const xml2js = require("xml2js");
const soapRequest = require("easy-soap-request");
const util = require("util");
const prisma = new PrismaClient();

export const universitySync = async () => {
    try {
        const { response } = await soapRequest({
            url: getAllUniversities.url,
            headers: getAllUniversities.headers,
            xml: getAllUniversities.body,
        });
        const { body } = response;
        const parser = new xml2js.Parser();
        const parsedBody = await parser.parseStringPromise(body);
        const universities =
            parsedBody["S:Envelope"]["S:Body"][0][
                "ns2:getAllUniversitiesResponse"
            ][0]["return"];

        const universitiesFromDatabase = await prisma.university.findMany({
            select: {
                university_id: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        for (const uni of universitiesFromDatabase) {
            if (!universities || !universities?.find((u: any) => Number(u.restUniId) === uni.university_id)) {
                const { response } = await soapRequest({
                    url: createUniversity.url,
                    headers: createUniversity.headers,
                    xml: util.format(
                        createUniversity.body, 
                        uni.university_id, 
                        uni.user?.name
                    ),
                });
                const { body } = response;
                const parser = new xml2js.Parser();
                const parsedBody = await parser.parseStringPromise(body);
                console.log(parsedBody);
            }
        }
    } catch (error) {
        console.error('🛑 [UNIVERSITY] Error making SOAP request');
    }
};
