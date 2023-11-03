import dotenv from "dotenv";
dotenv.config();

const url = process.env.SOAP_URL + "/ws/UniversityService?wsdl";

const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "API-Key": process.env.SOAP_API_KEY,
};

const getAllUniversitiesTemplate = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getAllUniversities xmlns="http://services.soap.orden.com/">
            </getAllUniversities>
        </Body>
    </Envelope>
    `;

const createUniversityTemplate = `
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <createUniversity xmlns="http://services.soap.orden.com/">
            <rest_uni_id xmlns="">%d</rest_uni_id>
            <university_name xmlns="">%s</university_name>
        </createUniversity>
    </Body>
    </Envelope>
`;

export const getAllUniversities = {
    url,
    headers,
    body: getAllUniversitiesTemplate,
};

export const createUniversity = {
    url,
    headers,
    body: createUniversityTemplate,
};
