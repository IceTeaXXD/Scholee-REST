import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createScholarship = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            short_description,
            coverage,
            contact_name,
            contact_email,
            organization_id,
            type,
        } = req.body;

        const scholarship = await prisma.scholarship.create({
            data: {
                title,
                description,
                short_description,
                coverage,
                contact_name,
                contact_email,
                organization: {
                    connect: {
                        organization_id,
                    },
                },
                scholarshiptype: {
                    create: type.map((element: string) => ({
                        type: element,
                    })),
                },
            },
            include: {
                scholarshiptype: true,
            },
        });

        res.status(201).json(scholarship);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getScholarships = async (req: Request, res: Response) => {
    try {
        const scholarships = await prisma.scholarship.findMany({
            include: {
                scholarshiptype: true,
                organization: true,
            },
        });

        res.status(200).json(scholarships);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getScholarship = async (req: Request, res: Response) => {
    try {
        const scholarship = await prisma.scholarship.findUnique({
            where: {
                scholarship_id: Number(req.params.id),
            },
            include: {
                scholarshiptype: true,
                organization: true,
            },
        });
        res.status(200).json(scholarship);
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateScholarship = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            short_description,
            coverage,
            contact_name,
            contact_email,
            organization_id,
            type,
        } = req.body;
        const { id } = req.params;
        const existingScholarship = await prisma.scholarship.findUnique({
            where: {
                scholarship_id: Number(id),
            },
            include: {
                scholarshiptype: true,
                organization: true,
            },
        });

        if (!existingScholarship) {
            return res.status(404).json({ message: "Scholarship not found" });
        }

        const updatedScholarship = await prisma.scholarship.update({
            where: {
                scholarship_id: Number(id),
            },
            data: {
                title,
                description,
                short_description,
                coverage,
                contact_name,
                contact_email,
                organization: {
                    connect: {
                        organization_id,
                    },
                },
                scholarshiptype: {
                    deleteMany: {
                        scholarship_id: Number(id),
                    },
                    create: type.map((element: string) => ({
                        type: element,
                    })),
                },
            },
            include: {
                scholarshiptype: true,
                organization: true,
            },
        });

        res.status(200).json(updatedScholarship);
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            message: error.message,
        });
    }
};

export const deleteScholarship = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const scholarship = await prisma.scholarship.delete({
            where: {
                scholarship_id: Number(id),
            },
            include: {
                scholarshiptype: true,
                organization: true,
            },
        });
        res.status(200).json(scholarship);
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            message: error.message,
        });
    }
};
