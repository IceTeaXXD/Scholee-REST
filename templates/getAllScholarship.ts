const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": process.env.SOAP_API_KEY
}

const getAllScholarshipUrl = process.env.SOAP_URL + "/ws/ScholarshipService?wsdl"

const getAllScholarshipTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getAllScholarship xmlns="http://services.soap.orden.com/">
        </getAllScholarship>
    </Body>
</Envelope>
`

export const getAllScholarships = {
    getAllScholarshipUrl,
    headers, 
    body: getAllScholarshipTemplate
}