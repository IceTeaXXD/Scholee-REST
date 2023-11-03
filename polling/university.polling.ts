const soap = require('soap')

export const getAllUniversities = async () => {
    try {
        // const url = process.env.SOAP_URL + "/ws/UniversityService?wsdl";
        const url = "http://localhost:8080/ws/UniversityService?wsdl";
        const client = await soap.createClientAsync(url);
        const result = await client.getAllUniversitiesAsync(
            {},
            {
                headers:{
                    "API-KEY": "shortT_Key"
                }
            }
        );

        console.log(result[0])

    } catch (error: any) {
        console.error('SOAP request error:', error.message);
        console.error(error.stack);
        throw error;
    }
}