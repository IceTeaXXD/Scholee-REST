import dotenv from "dotenv"
dotenv.config()

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": process.env.SOAP_API_KEY
}

const url = process.env.SOAP_URL + "/ws/ScholarshipService?wsdl"

const getAllScholarshipEnvelope = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getAllScholarship xmlns="http://services.soap.orden.com/">
            </getAllScholarship>
        </Body>
    </Envelope>
    `

const setScholarshipRESTTemplate = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <setRESTscholarshipID xmlns="http://services.soap.orden.com/">
            <user_id_scholarship_php xmlns="">%d</user_id_scholarship_php>
            <scholarship_id_php xmlns="">%d</scholarship_id_php>
            <user_id_scholarship_rest xmlns="">%d</user_id_scholarship_rest>
            <scholarship_id_rest xmlns="">%d</scholarship_id_rest>
        </setRESTscholarshipID>
    </Body>
    </Envelope>
`

const viewScholarshipCountTemplate = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getScholarshipView xmlns="http://services.soap.orden.com/">
                <user_id_scholarship_rest xmlns="">%d</user_id_scholarship_rest>
            </getScholarshipView>
        </Body>
    </Envelope>
`

export const getAllScholarship = {
    url,
    headers,
    body: getAllScholarshipEnvelope
}

export const setScholarshipREST = {
    url,
    headers, 
    body: setScholarshipRESTTemplate
}

export const viewScholarshipCount = {
    url,
    headers,
    body: viewScholarshipCountTemplate
}