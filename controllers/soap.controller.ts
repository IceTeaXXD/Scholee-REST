import { Request, Response } from "express";

const soap = require('soap')
const url = "http://localhost:8080/ws/OrganizationRegistration?wsdl"

export const OrganizationRegistration = async (req: Request, res:Response) => {
    try{
        const {org_id_php} = req.body

        const client = await soap.createClientAsync(url);
        const result = await client.registerOrganizationAsync(
            { 
                org_id_php: org_id_php
            },
            {
                headers: {
                    "API-KEY": 'shortT_Key',
                }
            }
        );
        
        res.status(200).json({
            status: "success",
            message: result[0].return
        });
    }catch (error: any){
        console.error('SOAP request error:', error);
        throw error;
    }
}