import { Prisma, PrismaClient, Role } from "@prisma/client"
import { Request, Response } from "express"
import stream, { Readable } from "stream"
import {google, drive_v3} from 'googleapis'
import path from "path"

const prisma = new PrismaClient()

export const getAssignment = async (req: Request, res: Response) => {
    try {
        const { sid, aid } = req.params
        const assignment = await prisma.assignment.findUnique({
            where: {
                assignment_id: Number(aid),
                scholarship_id: Number(sid)
            },
            select: {
                desc: true,
                name: true
            }
        })

        if (!assignment) {
            throw new Error("Assignment Not Found!")
        }

        res.status(200).json({
            status: "success",
            message: "Assignment retrieved successfully",
            data: {
                assignment_id: aid,
                assignment_name: assignment.name,
                assignment_description: assignment.desc
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

export const getAssignmentAll = async (req: Request, res: Response) => {
    try {
        const assignments = await prisma.assignment.findMany({
            include: {
                scholarship: true
            }
        })

        if (!assignments) {
            throw new Error("Assignment Not Found!")
        }

        res.status(200).json({
            status: "success",
            message: "Assignment retrieved successfully",
            data: assignments.map((assignment) => {
                return{
                    assignment_id: assignment.assignment_id,
                    scholarship_id: assignment.scholarship_id,
                    assignment_name: assignment.name,
                    assignment_description: assignment.desc,
                    scholarship_name: assignment.scholarship.title
                }
            })
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

export const createAssignment = async (req: Request, res: Response) => {
    try {
        const { organization_id, scholarship_id, name, description } = req.body

        const assignment = await prisma.assignment.create({
            data: {
                organization_id,
                scholarship_id,
                name,
                desc: description
            }
        })

        res.status(200).json({
            status: "success",
            message: "Assignment created successfully",
            data: {
                assignment_id: assignment.assignment_id,
                organization_id: assignment.organization_id,
                assignment_name: assignment.name,
                assignment_description: assignment.desc,
                scholarship_id: assignment.scholarship_id
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}
const KEYFILEPATH = path.join(__dirname, '..', 'cred.json')
const SCOPES = ["https://www.googleapis.com/auth/drive"]

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

export const uploadFile = async (fileObject : any) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["16MsCQmIcu4LibyJYMyNeBRXDrRYCs29u"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};