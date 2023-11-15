import { Request, Response } from "express"
import axios from 'axios'
import { getStudentOfScholarship } from "../templates/student";

const xml2js = require("xml2js")
const soapRequest = require("easy-soap-request")
const util = require("util")

export const getUserPhpInfo = async (req : Request, res : Response) => {
    try {
        const uid = req.params.uid
        const URL = process.env.MONOLITH_URL + "/api/profile/info.php?userid=" + uid
        const response = await axios.get(URL);
        const { name, email } = response.data;
        res.status(200).json({
            status: "success",
            message: "Assignment retrieved successfully",
            data: {
                user: {
                    name,
                    email,
                },
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

export const getStudentFromScholarship = async (req: Request, res: Response) => {
    try {
        const sid = req.params.sid
        console.log("SID", sid)

        const { response } = await soapRequest({
            url: getStudentOfScholarship.url,
            headers: getStudentOfScholarship.headers,
            xml: util.format(
                getStudentOfScholarship.body,
                sid
            )
        })
        
        const { body } = response
        console.log("body",body)
        const parser = new xml2js.Parser()
        const parsedBody = await parser.parseStringPromise(body)
        const scholarships =
        parsedBody["S:Envelope"]["S:Body"][0]["ns2:getStudentOfScholarshipResponse"][0][
            "return"
        ]
        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: {
                scholarships
            },
        });
    } catch(error : any) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}