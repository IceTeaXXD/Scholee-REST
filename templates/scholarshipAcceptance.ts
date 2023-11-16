import dotenv from "dotenv"
dotenv.config()

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": process.env.SOAP_API_KEY
}

const url = process.env.SOAP_URL + "/ws/ScholarshipAcceptance?wsdl"

const setAcceptanceTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <setAcceptance xmlns="http://services.soap.orden.com/">
            <user_id_student xmlns="">%d</user_id_student>
            <scholarship_id_rest xmlns="">%d</scholarship_id_rest>
            <scholarship_name xmlns="">%s</scholarship_name>
            <status xmlns="">%s</status>
        </setAcceptance>
    </Body>
</Envelope>
`

const getAllScholarshipAcceptanceTemplate = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://services.soap.orden.com/">
    <soapenv:Header/>
    <soapenv:Body>
        <web:getAllScholarshipAcceptance/>
    </soapenv:Body>
</soapenv:Envelope>
`
const setScholarshipIDRESTTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <setScholarshipIDREST xmlns="http://services.soap.orden.com/">
            <user_id_scholarship_php xmlns="">%d</user_id_scholarship_php>
            <scholarship_id_php xmlns="">%d</scholarship_id_php>
            <scholarship_id_rest xmlns="">%d</scholarship_id_rest>
        </setScholarshipIDREST>
    </Body>
</Envelope>`;

export const setAcceptance = {
    url,
    headers,
    body: setAcceptanceTemplate
}

export const setAcceptanceScholarshipIDREST = {
    url,
    headers,
    body: setScholarshipIDRESTTemplate
}

export const getAllScholarshipAcceptance = {
    url,
    headers,
    body : getAllScholarshipAcceptanceTemplate
}