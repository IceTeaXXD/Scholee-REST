// import { Prisma, PrismaClient, Role } from "@prisma/client";
// import { Request, Response } from "express";

// const prisma = new PrismaClient();

export const getAssignment = async (req: Request, res: Response) => {
    try{
        const {sid, aid} = req.params;
        const assignment = await prisma.assignment.findUnique({
            where: {
                assignment_id: Number(aid),
                scholarship_id: Number(sid)
            },
            select:{
                desc: true,
                name: true,
            }
        });

        if(!assignment){
            throw new Error("Assignment Not Found!");
        }

        res.status(200).json({
            status: "success",
            message: "Assignment retrieved successfully",
            data: {
                assignment_id: aid,
                assignment_name: assignment.name,
                assignment_description: assignment.desc,
            },
        });
    }catch (error: any){
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
}

export const createAssignment = async(req: Request, res: Response) => {
    try{
        const { organization_id, scholarship_id, name,  description  } = req.body

        const assignment = await prisma.assignment.create({
            data: {
              organization_id,
              scholarship_id,
              name,
              desc: description, 
            },
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
            },
        });

    }catch (error: any){
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
}