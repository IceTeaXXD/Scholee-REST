import dotenv from "dotenv"
dotenv.config()

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "API-Key": process.env.SOAP_API_KEY
}

const url = process.env.SOAP_URL + "/ws/ScholarshipAcceptanceService?wsdl"

const setAcceptanceTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <setAcceptance xmlns="http://services.soap.orden.com/">
            <user_id_student xmlns="">%d</user_id_student>
            <scholarship_id_rest xmlns="">%d</scholarship_id_rest>
            <status xmlns="">%s</status>
        </setAcceptance>
    </Body>
</Envelope>
`

export const setAcceptance = {
    url,
    headers,
    body: setAcceptanceTemplate
}
