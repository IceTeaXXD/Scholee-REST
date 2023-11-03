import { Request, Response } from "express";
import { setAcceptance } from "../templates/scholarshipAcceptance"
import { createRESTId, validateReferralCode  } from "../templates/organization";

const soapRequest = require("easy-soap-request");
const util = require("util")
const xml2js = require("xml2js");

/* scholarshipAcceptance
 * Basically just sets the acceptance of a certain uid, uis, sid with status
 * either accepted or rejected
*/
export const scholarshipAcceptance = async (req: Request, res: Response) => {
    try {
        const { user_id_student, user_id_scholarship, scholarship_id, status } = req.body;
        const result = await soapRequest({
            url: setAcceptance.url,
            headers: setAcceptance.headers,
            xml: util.format(
                setAcceptance.body,
                user_id_student,
                user_id_scholarship,
                scholarship_id,
                status
            )}
        );

        const { body } = result.response

        const parser = new xml2js.Parser();
        const parsedBody = await parser.parseStringPromise(body);
        const message =
            parsedBody["S:Envelope"]["S:Body"][0][
                "ns2:setAcceptanceResponse"
            ][0]["return"];

        res.status(200).json({
            status: "success",
            message: message
        });
    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}

/* 
 * OrganizationRegistration
 * Creates a Organization Admin
 * Finds Referral Code first. If true then create a organization admin in REST
 * Get the id of the new admin, insert into SOAP
 */
export const OrganizationRegistration = async (req: Request, res: Response) => {
    try {
        /* Verify the Referral Code */
        const { referral_code } = req.body;
        const request = await soapRequest({
            url: validateReferralCode.url,
            headers: validateReferralCode.headers,
            xml: util.format(
                validateReferralCode.body,
                referral_code
            )
        })

        const { body } = request.response
        const parser = new xml2js.Parser();
        const parsedBody = await parser.parseStringPromise(body)
        const message = parsedBody["S:Envelope"]["S:Body"][0]["ns2:validateReferralCodeResponse"][0]["return"];
        
        if (message != "True") {
            res.status(200).json({
                status: "Failed",
                message: "No Such refferal Code"
            });
        } else {
            /* TODO: Register The Admin Organization Admin */

            const org_id_rest = 1; // This is supposed to be the ID in REST

            /* Upload the User_ID to SOAP */
            const request = await soapRequest({
                url: createRESTId.url,
                headers: createRESTId.headers,
                xml: util.format(
                    createRESTId.body,
                    org_id_rest,
                    referral_code
                )
            })

            const { body } = request.response
            const parse = new xml2js.Parser()
            const parsedBody = await parse.parseStringPromise(body)

            const message = parsedBody["S:Envelope"]["S:Body"][0]["ns2:createRESTIdResponse"][0]["return"]

            res.status(200).json({
                status: "success",
                message: message[0]
            });
        }

    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}
