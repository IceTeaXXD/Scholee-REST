import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import stream from "stream"
import {google} from 'googleapis'
import path from "path"
import { file } from "googleapis/build/src/apis/file"
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
        const { sid, aid } = req.params
        const files = await prisma.files.findUnique({
            where: {
                scholarship_id: Number(sid),
                file_id: Number(aid)
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
        const { sid, aid } = req.params;
        const { uid } = req.body;
        const { files } : any = req;
        
        const scholarship = await prisma.scholarship.findUnique({
            where: { scholarship_id: parseInt(sid) }
        });

        const assignment = await prisma.assignment.findUnique({
            where: { assignment_id: parseInt(aid) }
        });

        if (!scholarship || !assignment) {
            return res.status(404).json({
                status: "error",
                message: "Scholarship or assignment not found."
            });
        }

        const savedFiles = await Promise.all(
            files.map(async (file: any) => {
                const fileUrl = await uploadFile(file);
                return prisma.files.create({
                    data: {
                        user_id_student: Number(uid),
                        file_path: fileUrl,
                        organization_id: scholarship.organization_id,
                        scholarship_id: scholarship.scholarship_id,
                        assignment_id: assignment.assignment_id
                    } as any
                });
            })
        );

        res.status(200).json({
            status: "success",
            message: "Files uploaded successfully.",
            files: savedFiles
        });
    } catch (error: any) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const KEYFILEPATH = path.join(__dirname, '..', 'cred.json')
const SCOPES = ["https://www.googleapis.com/auth/drive"]

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

export const uploadFile = async (fileObject : any) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    try {
        const drive = google.drive({ version: 'v3', auth });
        const { data } = await drive.files.create({
            media: {
                mimeType: fileObject.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: fileObject.originalname,
                parents: ['16MsCQmIcu4LibyJYMyNeBRXDrRYCs29u'],
            },
            fields: 'id,name,webViewLink', 
        });

        return data.webViewLink;
    } catch (error : any) {
        console.error('Error uploading file to Google Drive:', error.message);
        throw error;
    }
};