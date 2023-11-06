import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/* URL: /scholarship/:sid/assignment/:aid/file/:fid/user/:uid */
export const getFileById = async (req: Request, res: Response) => {
    try {
        const { sid, aid, fid, uid } = req.params
        const files = await prisma.files.findUnique({
            where: {
                scholarship_id: Number(sid),
                assignment_id: Number(aid),
                file_id: Number(fid),
                user_id_student: Number(uid)
            },
            select: {
                file_path: true,
                file_id: true,
                user_id_student: true
            }
        })

        if (!files) {
            throw new Error("Files Not Found!")
        }

        res.status(200).json({
            status: "success",
            message: "File retrieved successfully",
            data: {
                file_id: files.file_id,
                file_path: files.file_path
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

/* URL: /scholarship/:sid/assignment/:aid/file */
export const getAllFiles = async (req: Request, res: Response) => {
    try {
        const { sid, fid } = req.params
        const files = await prisma.files.findUnique({
            where: {
                scholarship_id: Number(sid),
                file_id: Number(fid)
            },
            select: {
                file_path: true,
                file_id: true,
                user_id_student: true
            }
        })

        if (!files) {
            throw new Error("Files Not Found!")
        }

        res.status(200).json({
            status: "success",
            message: "File retrieved successfully",
            data: {
                file_id: files.file_id,
                file_path: files.file_path
            }
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

/* URL: /scholarship/:sid/assignment/:aid/ */
/* TODO: Middleware Uploading File */
export const uploadFiles = async (req: Request, res: Response) => {
    try {
        const { sid, aid } = req.params
        const { uid, file_path } = req.body

        const scholarship = await prisma.scholarship.findUnique({
            where: { scholarship_id: parseInt(sid) }
        })

        const assignment = await prisma.assignment.findUnique({
            where: { assignment_id: parseInt(aid) }
        })

        if (!scholarship || !assignment) {
            return res.status(404).json({
                status: "error",
                message: "Scholarship or assignment not found."
            })
        }

        const savedFile = await prisma.files.create({
            data: {
                user_id_student: Number(uid),
                file_path: "/path/to/your/uploaded/file" + file_path, // Replace with the actual file path
                organization_id: scholarship.organization_id,
                scholarship_id: scholarship.scholarship_id,
                assignment_id: assignment.assignment_id
            }
        })

        res.status(200).json({
            status: "success",
            message: "File uploaded successfully.",
            file: savedFile
        })
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}