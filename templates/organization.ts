import dotenv from "dotenv"
dotenv.config()

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": "shortT_Key"
}

const url = process.env.SOAP_URL + "/ws/OrganizationRegistration?wsdl"

const createRESTIdTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <createRESTId xmlns="http://services.soap.orden.com/">
            <org_id_rest xmlns="">%d</org_id_rest>
            <referral_code xmlns="">%s</referral_code>
        </createRESTId>
    </Body>
</Envelope>
`

const validateReferralCodeTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <validateReferralCode xmlns="http://services.soap.orden.com/">
            <referral_code xmlns="">%s</referral_code>
        </validateReferralCode>
    </Body>
</Envelope>
`

export const createRESTId = {
    url,
    headers,
    body: createRESTIdTemplate
}

export const validateReferralCode = {
    url,
    headers,
    body: validateReferralCodeTemplate
}
