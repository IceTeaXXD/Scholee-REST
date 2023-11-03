import dotenv from "dotenv";
dotenv.config();

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "API-Key": process.env.SOAP_API_KEY,
};

const url = process.env.SOAP_URL + "/ws/ScholarshipAcceptanceService?wsdl";

const setAcceptanceTemplate = `
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <setAcceptance xmlns="http://services.soap.orden.com/">
            <user_id_student xmlns="">%d</user_id_student>
            <user_id_scholarship xmlns="">%d</user_id_scholarship>
            <scholarship_id xmlns="">%d</scholarship_id>
            <status xmlns="">%s</status>
        </setAcceptance>
    </Body>
</Envelope>
`;

export const setAcceptance = {
   url,
   headers,
   body: setAcceptanceTemplate
};