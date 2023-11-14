import { Prisma, PrismaClient, Role } from "@prisma/client"
import { Request, Response } from "express"

import jwt from "jsonwebtoken"
import { getAllScholarships } from "../templates/getAllScholarship"
import { getAllScholarshipAcceptance } from "../templates/scholarshipAcceptance"
const util = require("util")
const xml2js = require("xml2js")
const soapRequest = require("easy-soap-request")

const prisma = new PrismaClient()

export const getAssignment = async (req: Request, res: Response) => {
  try {
    const { sid, aid } = req.params
    const accessToken = req.cookies.accToken
    if (!accessToken) {
      // MONOLITH
      const userId = req.headers["user_id"] as string | undefined

      if (!userId) {
        return res.status(400).json({
          status: "error",
          message: "User id is missing in headers"
        })
      }

      const scholarshipAcc = await soapRequest({
        url: getAllScholarshipAcceptance.scholarshipAccUrl,
        headers: getAllScholarshipAcceptance.headers,
        xml: util.format(getAllScholarshipAcceptance.body)
      })

      const scholarshipAccData = await parseSoapResponse(
        scholarshipAcc.response.body
      )
      const filteredScholarshipAccData = scholarshipAccData.filter(
        (item: any) => {
          return (
            item.user_id_student[0] === userId &&
            item.scholarship_id_rest[0] === sid
          )
        }
      )

      if (filteredScholarshipAccData.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "No assignments found for the user and scholarship",
          data: []
        })
      } else {
        const assignment = await prisma.assignment.findUnique({
          where: {
            assignment_id: Number(aid),
            scholarship_id: Number(sid)
          },
          include: {
            scholarship: true
          }
        })
        res.status(200).json({
          status: "success",
          message: "Assignment retrieved successfully",
          data: {
            assignments: formatAssignmentData([assignment])
          }
        })
      }
    } else {
      //SPA
      const result = await soapRequest({
        url: getAllScholarships.getAllScholarshipUrl,
        headers: getAllScholarships.headers,
        xml: util.format(getAllScholarships.body)
      })

      const { body } = result.response

      const parser = new xml2js.Parser()
      const parsedBody = await parser.parseStringPromise(body)
      const scholarshipData =
        parsedBody["S:Envelope"]["S:Body"][0][
          "ns2:getAllScholarshipResponse"
        ][0]["return"]

      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as any
      const userId = decoded.UserInfo?.user_id as string | undefined
      const filteredAssignments = scholarshipData.filter((scholarship: any) => {
        const user_id_scholarship = scholarship["user_id_scholarship_rest"]?.[0]
        return user_id_scholarship === (userId as any).toString()
      })

      const assignment = await prisma.assignment.findUnique({
        where: {
          assignment_id: Number(aid),
          scholarship_id: Number(sid)
        },
        include: {
          scholarship: true
        }
      })
      const filteredAssignmentIds = filteredAssignments.map((filtered: any) =>
        parseInt(filtered.scholarship_id_rest[0], 10)
      )

      res.status(200).json({
        status: "success",
        message: "Assignment retrieved successfully",
        data: filteredAssignmentIds.includes(
          assignment?.scholarship?.scholarship_id ?? null
        )
          ? {
              assignment_id: assignment?.assignment_id ?? null,
              assignment_name: assignment?.name ?? null,
              assignment_description: assignment?.desc ?? null
            }
          : null
      })
    }
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const getAssignmentBySid = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.accToken
    const { sid } = req.params

    if (!accessToken) {
      // USER MONOLITH
      const userId = req.headers["user_id"] as string | undefined

      if (!userId) {
        return res.status(400).json({
          status: "error",
          message: "User ID is missing in headers"
        })
      }

      const scholarshipAcc = await soapRequest({
        url: getAllScholarshipAcceptance.scholarshipAccUrl,
        headers: getAllScholarshipAcceptance.headers,
        xml: util.format(getAllScholarshipAcceptance.body)
      })

      const scholarshipAccData = await parseSoapResponse(
        scholarshipAcc.response.body
      )
      const filteredScholarshipAccData = scholarshipAccData.filter(
        (item: any) => {
          return (
            item.user_id_student[0] === (userId as any).toString() &&
            item.scholarship_id_rest[0] === (sid as any).toString()
          )
        }
      )
      if (filteredScholarshipAccData.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "No assignments found for the user and scholarship",
          data: []
        })
      }

      const scholarshipIds = filteredScholarshipAccData.map(
        (item: any) => item.scholarship_id_rest[0]
      )
      const assignments = await getAssignmentsByScholarshipIds(scholarshipIds)

      if (assignments.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "No assignments found for the user and scholarship",
          data: []
        })
      }

      return res.status(200).json({
        status: "success",
        message: "Assignments retrieved successfully",
        data: formatAssignmentData(assignments)
      })
    } else {
      // ADMIN REST
      const userId = getUserIdFromToken(accessToken)

      const scholarshipData = await getScholarshipData()
      const filteredAssignments = scholarshipData.filter((scholarship: any) => {
        const user_id_scholarship = scholarship["user_id_scholarship_rest"]?.[0]
        const scholarship_id_rest = scholarship["scholarship_id_rest"]?.[0]
        return (
          user_id_scholarship === (userId as any).toString() &&
          scholarship_id_rest === (sid as any).toString()
        )
      })

      if (filteredAssignments.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "No assignments found for the user",
          data: []
        })
      }

      const scholarshipIds = filteredAssignments.map(
        (scholarship: any) => scholarship.scholarship_id_rest[0]
      )
      const assignments = await getAssignmentsByScholarshipIds(scholarshipIds)

      if (assignments.length === 0) {
        throw new Error("Assignment Not Found!")
      }

      assignments.sort((a, b) => a.assignment_id - b.assignment_id)

      return res.status(200).json({
        status: "success",
        message: "Assignments retrieved successfully",
        data: formatAssignmentData(assignments)
      })
    }
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

async function parseSoapResponse(responseBody: string) {
  const parser = new xml2js.Parser()
  const parsedBody = await parser.parseStringPromise(responseBody)
  return parsedBody["S:Envelope"]["S:Body"][0][
    "ns2:getAllScholarshipAcceptanceResponse"
  ][0]["return"]
}

async function getAssignmentsByScholarshipIds(scholarshipIds: string[]) {
  const assignments = await prisma.assignment.findMany({
    where: {
      scholarship_id: {
        in: scholarshipIds.map(Number)
      }
    },
    include: {
      scholarship: true
    }
  })
  return assignments || []
}

function formatAssignmentData(assignments: any[]) {
  return assignments.map((assignment) => ({
    assignment_id: assignment.assignment_id,
    scholarship_id: assignment.scholarship_id,
    assignment_name: assignment.name,
    assignment_description: assignment.desc,
    scholarship_name: assignment.scholarship.title
  }))
}

function getUserIdFromToken(accessToken: string) {
  const decoded = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as any
  return decoded.UserInfo?.user_id as string | undefined
}

async function getScholarshipData() {
  const result = await soapRequest({
    url: getAllScholarships.getAllScholarshipUrl,
    headers: getAllScholarships.headers,
    xml: util.format(getAllScholarships.body)
  })

  const { body } = result.response
  const parser = new xml2js.Parser()
  const parsedBody = await parser.parseStringPromise(body)
  return parsedBody["S:Envelope"]["S:Body"][0][
    "ns2:getAllScholarshipResponse"
  ][0]["return"]
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

async function getAssignmentByIdAndScholarshipId(aid: string, sid: string) {
  return prisma.assignment.findUnique({
    where: {
      assignment_id: Number(aid),
      scholarship_id: Number(sid)
    },
    include: {
      scholarship: true
    }
  })
}

export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { sid, aid } = req.params
    const { name, desc } = req.body

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

    const assignment = await getAssignmentByIdAndScholarshipId(aid, sid)
    if (!assignment) {
      throw new Error("Assignment Not Found!")
    }

    if (assignment.organization_id !== organization_id) {
      throw new Error("Unauthorized!")
    }

    const updatedAssignment = await prisma.assignment.update({
      where: {
        assignment_id: Number(aid)
      },
      data: {
        name,
        desc
      }
    })

    res.status(200).json({
      status: "success",
      message: "Assignment updated successfully",
      data: {
        assignment_id: updatedAssignment.assignment_id,
        organization_id: updatedAssignment.organization_id,
        assignment_name: updatedAssignment.name,
        assignment_description: updatedAssignment.desc,
        scholarship_id: updatedAssignment.scholarship_id
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { sid, aid } = req.params
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

    const assignment = await getAssignmentByIdAndScholarshipId(aid, sid)
    if (!assignment) {
      throw new Error("Assignment Not Found!")
    }

    if (assignment.organization_id !== organization_id) {
      throw new Error("Unauthorized!")
    }

    await prisma.assignment.delete({
      where: {
        assignment_id: Number(aid)
      }
    })

    res.status(200).json({
      status: "success",
      message: "Assignment deleted successfully"
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}
