import { Prisma, PrismaClient, Role } from "@prisma/client"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const getAssignment = async (req: Request, res: Response) => {
  try {
    const { sid, aid } = req.params
    const assignment = await prisma.assignment.findUnique({
      where: {
        assignment_id: Number(aid),
        scholarship_id: Number(sid)
      },
      include: {
        scholarship: true
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

export const getAssignmentBySid = async (req: Request, res: Response) => {
  try {
    const { sid } = req.params
    const assignments = await prisma.assignment.findMany({
      where: {
        scholarship_id: Number(sid)
      },
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
        return {
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
    const { scholarship_id, name, desc } = req.body

    const accessToken = req.cookies.accToken
    if (!accessToken) {
      res.status(401).json({ message: "Access token missing" })
      return
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any
    const organization_id = decoded.UserInfo.user_id

    const assignment = await prisma.assignment.create({
      data: {
        organization_id,
        scholarship_id,
        name,
        desc
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
    console.log(error)
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}
