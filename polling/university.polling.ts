const soap = require('soap')

export const getAllUniversities = async () => {
    try {
        // const url = process.env.SOAP_URL + "/ws/UniversityService?wsdl";
        const url = "http://localhost:8080/ws/UniversityService?wsdl";
        const client = await soap.createClientAsync(url);

    } catch (error: any) {
        console.error('SOAP request error:', error.message);
        console.error(error.stack);
        throw error;
    }
}