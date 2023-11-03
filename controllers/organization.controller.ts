import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import crypro from "crypto";
import {hash} from "bcrypt";
import { createRESTId, validateReferralCode  } from "../templates/organization";

const soapRequest = require("easy-soap-request");
const util = require("util")
const xml2js = require("xml2js");

const prisma = new PrismaClient();
export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            email, 
            password, 
            address, 
            organizationDescription,
            referral_code 
        } = req.body;

        // Verify the referral code
        const request = await soapRequest({
            url: validateReferralCode.url,
            headers: validateReferralCode.headers,
            xml: util.format(
                validateReferralCode.body,
                referral_code
            )
        })

        const { body } = request.response
        const parser = new xml2js.Parser();
        const parsedBody = await parser.parseStringPromise(body);
        const message =
            parsedBody["S:Envelope"]["S:Body"][0][
                "ns2:validateReferralCodeResponse"
            ][0]["return"];

        if (message === "false") {
            throw new Error("Invalid referral code");
        }

        // If email exists, throw error
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            throw new Error("Email already exists");
        }

        // Hash the password
        const saltRounds = 10; // You can adjust this number based on your security requirements
        const hashedPassword = await hash(password, saltRounds);

        const newOrganization = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // Store the hashed password in the database
                address,
                role: Role.organization,
                organization: {
                    create: {
                        description: organizationDescription,
                    },
                },
                verification: {
                    create: {
                        verification_token: crypro
                            .randomBytes(8)
                            .toString("hex"),
                    },
                },
            },
        });

        // Create a new organization in SOAP
        // TODO: SOMEHOW IT'S ALWAYS ERROR BRO
        const organizationId = newOrganization.user_id;
        
        const requestOrgSoap = await soapRequest({
            url: createRESTId.url,
            headers: createRESTId.headers,
            xml: util.format(
                createRESTId.body,
                organizationId
            )
        })

        console.log(requestOrgSoap)

        const { body: bodyOrgSoap } = requestOrgSoap.response
        const parserOrgSoap = new xml2js.Parser();
        const parsedBodyOrgSoap = await parserOrgSoap.parseStringPromise(bodyOrgSoap);

        const messageOrgSoap =
            parsedBodyOrgSoap["S:Envelope"]["S:Body"][0][
                "ns2:createRESTIdResponse"
            ][0]["return"];

        console.log(messageOrgSoap)

        if (messageOrgSoap != "true") {
            throw new Error("SOAP request failed");
        }

        res.status(200).json({
            status: "success",
            message: "Organization created successfully",
            data: {
                organization_id: newOrganization.user_id,
                organization_name: newOrganization.name,
                organization_email: newOrganization.email,
                organization_address: newOrganization.address,
                organization_description: organizationDescription,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await prisma.organization.findMany({
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true,
                    },
                },
                description: true,
            },
        });

        if (!organizations) {
            throw new Error("Organizations not found");
        }

        res.status(200).json({
            status: "success",
            message: "Organizations retrieved successfully",
            data: organizations.map((organization) => {
                return {
                    organization_id: organization.organization_id,
                    organization_name: organization.user?.name ?? null,
                    organization_email: organization.user?.email ?? null,
                    organization_address: organization.user?.address ?? null,
                    organization_description: organization.description,
                };
            }),
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

export const getOrganization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id),
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true,
                    },
                },
                description: true,
            },
        });

        if (!organization) {
            throw new Error("Organization not found");
        }

        res.status(200).json({
            status: "success",
            message: "Organization retrieved successfully",
            data: {
                organization_id: organization.organization_id,
                organization_name: organization.user?.name ?? null,
                organization_email: organization.user?.email ?? null,
                organization_address: organization.user?.address ?? null,
                organization_description: organization.description,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

export const updateOrganization = async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            email, 
            address,
            description 
        } = req.body;
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id),
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true,
                    },
                },
                description: true,
            },
        });

        if (!organization) {
            throw new Error("Organization not found");
        }

        const updatedOrganization = await prisma.organization.update({
            where: {
                organization_id: Number(id),
            },
            data: {
                user: {
                    update: {
                        name,
                        email,
                        address,
                    },
                },
                description,
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true,
                    },
                },
                description: true,
            },
        });

        res.status(200).json({
            status: "success",
            message: "Organization updated successfully",
            data: {
                organization_id: updatedOrganization.organization_id,
                organization_name: updatedOrganization.user?.name ?? null,
                organization_email: updatedOrganization.user?.email ?? null,
                organization_address: updatedOrganization.user?.address ?? null,
                organization_description: updatedOrganization.description,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id),
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true,
                    },
                },
                description: true,
            },
        });

        if (!organization) {
            throw new Error("Organization not found");
        }

        // delete the user
        await prisma.user.delete({
            where: {
                user_id: Number(id),
            },
        });

        res.status(200).json({
            status: "success",
            message: "Organization deleted successfully",
            data: {
                organization_id: organization.organization_id,
                organization_name: organization.user?.name ?? null,
                organization_email: organization.user?.email ?? null,
                organization_address: organization.user?.address ?? null,
                organization_description: organization.description,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};
