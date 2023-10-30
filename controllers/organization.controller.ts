import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import crypro from "crypto";
import {hash} from "bcrypt";

const prisma = new PrismaClient();
export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            email, 
            password, 
            address, 
            organizationDescription 
        } = req.body;

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

        const newUser = await prisma.user.create({
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

        res.status(200).json({
            status: "success",
            message: "Organization created successfully",
            data: {
                organization_id: newUser.user_id,
                organization_name: newUser.name,
                organization_email: newUser.email,
                organization_address: newUser.address,
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
