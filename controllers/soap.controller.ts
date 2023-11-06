import { Request, Response } from "express"
import { setAcceptance } from "../templates/scholarshipAcceptance"

const soapRequest = require("easy-soap-request")
const util = require("util")
const xml2js = require("xml2js")

/* scholarshipAcceptance
 * Basically just sets the acceptance of a certain uid, uis, sid with status
 * either accepted or rejected
 */
export const scholarshipAcceptance = async (req: Request, res: Response) => {
    try {
        const { user_id_student, scholarship_id, status } = req.body

        const result = await soapRequest({
            url: setAcceptance.url,
            headers: setAcceptance.headers,
            xml: util.format(
                setAcceptance.body,
                user_id_student,
                scholarship_id,
                status
            )
        })

        const { body } = result.response

        const parser = new xml2js.Parser()
        const parsedBody = await parser.parseStringPromise(body)
        const message =
            parsedBody["S:Envelope"]["S:Body"][0][
                "ns2:setAcceptanceResponse"
            ][0]["return"]

        res.status(200).json({
            status: "success",
            message: message
        })
    } catch (error: any) {
        console.error("SOAP request error:", error)
        throw error
    }
}
