import { Request, Response } from "express";

const soap = require('soap')

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
        const url = process.env.SOAP_URL + "/ws/OrganizationRegistration?wsdl";
        const client = await soap.createClientAsync(url);
        const result = await client.validateReferralCodeAsync(
            {
                referral_code: referral_code
            },
            {
                headers: {
                    "API-KEY": "shortT_Key"
                }
            }
        );

        if (result[0].return != "True") {
            res.status(200).json({
                status: "Failed",
                message: "No Such refferal Code"
            });
        } else {
            /* TODO: Register The Admin Organization Admin */

            const org_id_rest = 1; // This is supposed to be the ID in REST

            /* Upload the User_ID to SOAP */
            const result = await client.createRESTIdAsync(
                {
                    org_id_rest: org_id_rest,
                    referral_code: referral_code,
                },
                {
                    headers: {
                        "API-KEY": "shortT_Key"
                    }
                }
            );

            res.status(200).json({
                status: "success",
                message: result[0].return
            });
        }

    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}

/* createUniversity
 * Should be projected from create scholarship
 * After creating scholarship in REST do it also here by calling this function
 */
export const createUniversity = async (req: Request, res: Response) => {
    try {
        const { rest_uni_id, university_name } = req.body;
        const url = process.env.SOAP_URL + "/ws/UniversityService?wsdl";
        const client = await soap.createClientAsync(url);
        const result = await client.createUniversityAsync(
            {
                rest_uni_id: rest_uni_id,
                university_name: university_name,
            },
            {
                headers: {
                    "API-KEY": "shortT_Key"
                }
            }
        );

        res.status(200).json({
            status: "success",
            message: result[0].return
        });

    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}

/* scholarshipAcceptance
 * Basically just sets the acceptance of a certain uid, uis, sid with status
 * either accepted or rejected
*/
export const scholarshipAcceptance = async (req: Request, res: Response) => {
    try {
        const { user_id_student, user_id_scholarship, scholarship_id, status } = req.body;
        const url = process.env.SOAP_URL + "/ws/ScholarshipAcceptanceService?wsdl";
        const client = await soap.createClientAsync(url);
        const result = await client.setAcceptanceAsync(
            {
                user_id_student: user_id_student,
                user_id_scholarship: user_id_scholarship,
                scholarship_id: scholarship_id,
                status: status
            },
            {
                headers: {
                    "API-KEY": "shortT_Key"
                }
            }
        );

        res.status(200).json({
            status: "success",
            message: result[0].return
        });
    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}

export const getAllUniversities = async (req: Request, res: Response) => {
    try {
        const url = process.env.SOAP_URL + "/ws/UniversityService?wsdl";
        const client = await soap.createClientAsync(url);
        const result = await client.getAllUniversitiesAsync(
            {},
            {
                headers: {
                    "API-KEY": "shortT_Key"
                }
            }
        );

        res.status(200).json({
            status: "success",
            message: result[0].return
        });
    } catch (error: any) {
        console.error('SOAP request error:', error);
        throw error;
    }
}