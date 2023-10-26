import {PrismaClient, Role} from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { name, email, password, address, organizationDescription } = req.body;
        
        // If email exists, throw error
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            throw new Error("Email already exists");
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                address,
                role: Role.organization,
                organization: {
                    create: {
                        description: organizationDescription
                    }
                }
            }
        });
    
        res.status(200).json({
            status:"success",
            message:"Organization created successfully",
            data: {
                user: newUser
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status:"error",
            message: error.message
        })
    }
}

export const getOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await prisma.organization.findMany({
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
        });
    
        res.status(200).json({
            status: "success",
            message: "Organizations retrieved successfully",
            data: organizations.map((organization) => {
                return {
                    id: organization.organization_id,
                    name: organization.user?.name ?? null,
                    email: organization.user?.email ?? null,
                    address: organization.user?.address ?? null,
                };
            }),
        });
    } catch (error: any) {
        res.status(400).json({
            status:"error",
            message: error.message
        })
    }
}

export const getOrganization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id)
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
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
                address: organization.user?.address ?? null,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status:"error",
            message: error.message
        })
    }
}

export const updateOrganization = async (req: Request, res: Response) => {
    try {
        const { name, email, address } = req.body;
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id)
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
        });

        if (!organization) {
            throw new Error("Organization not found");
        }

        const updatedOrganization = await prisma.organization.update({
            where: {
                organization_id: Number(id)
            },
            data: {
                user: {
                    update: {
                        name,
                        email,
                        address
                    }
                }
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
        });

        res.status(200).json({
            status: "success",
            message: "Organization updated successfully",
            data: {
                organization_id: updatedOrganization.organization_id,
                organization_name: updatedOrganization.user?.name ?? null,
                organization_email: updatedOrganization.user?.email ?? null,
                address: updatedOrganization.user?.address ?? null,
            },
        });

    } catch (error: any) {
        res.status(400).json({
            status:"error",
            message: error.message
        })
    }
}

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const organization = await prisma.organization.findUnique({
            where: {
                organization_id: Number(id)
            },
            select: {
                organization_id: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        address: true
                    }
                }
            }
        });
    
        if (!organization) {
            throw new Error("Organization not found");
        }

        await prisma.organization.delete({
            where: {
                organization_id: Number(id)
            }
        });

        res.status(200).json({
            status: "success",
            message: "Organization deleted successfully",
            data: {
                organization_id: organization.organization_id,
                organization_name: organization.user?.name ?? null,
                organization_email: organization.user?.email ?? null,
                address: organization.user?.address ?? null,
            },
        });
    } catch (error: any) {
        res.status(400).json({
            status:"error",
            message: error.message
        })
    }
}