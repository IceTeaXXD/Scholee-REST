const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": process.env.SOAP_API_KEY
}

const getStudentOfScholarshipURL = process.env.SOAP_URL + "/ws/ScholarshipAcceptance?wsdl"

const getStudentOfScholarshipTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <getStudentOfScholarship xmlns="http://services.soap.orden.com/">
            <scholarship_id_rest xmlns="">%d</scholarship_id_rest>
        </getStudentOfScholarship>
    </Body>
</Envelope>
`

export const getStudentOfScholarship = {
    url : getStudentOfScholarshipURL,
    headers : headers, 
    body: getStudentOfScholarshipTemplate
}