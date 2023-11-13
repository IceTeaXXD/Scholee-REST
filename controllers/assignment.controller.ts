import { Prisma, PrismaClient, Role } from "@prisma/client"
import { Request, Response } from "express"
import { getAllScholarship } from "./soap.controller"

import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { getAllScholarships } from "../templates/getAllScholarship"
import { handleGetInfo } from "./auth.controller"
const util = require("util")
const xml2js = require("xml2js")
const soapRequest = require("easy-soap-request")

const prisma = new PrismaClient()

export const getAssignment = async (req: Request, res: Response) => {
  try {
    const result = await soapRequest({
      url: getAllScholarships.getAllScholarshipUrl,
      headers: getAllScholarships.headers,
      xml: util.format(getAllScholarships.body),
    });

    const { body } = result.response;

    const parser = new xml2js.Parser();
    const parsedBody = await parser.parseStringPromise(body);
    const scholarshipData = parsedBody['S:Envelope']['S:Body'][0]['ns2:getAllScholarshipResponse'][0]['return'];

    const accessToken = req.cookies.accToken;

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any;
    const userId = decoded.UserInfo?.user_id as string | undefined;
    const filteredAssignments = scholarshipData.filter((scholarship: any) => {
      const user_id_scholarship = scholarship['user_id_scholarship_rest']?.[0];
      return user_id_scholarship === (userId as any).toString();
    });
    
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
    const filteredAssignmentIds = filteredAssignments.map(
      (filtered : any) => parseInt(filtered.scholarship_id_rest[0], 10)
    );
    
    res.status(200).json({
      status: "success",
      message: "Assignment retrieved successfully",
      data: filteredAssignmentIds.includes(assignment.scholarship.scholarship_id)
        ? {
            assignment_id: assignment.assignment_id,
            assignment_name: assignment.name,
            assignment_description: assignment.desc,
          }
        : null,
    });       
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const getAssignmentBySid = async (req: Request, res: Response) => {
  try {
    // check for scholarship 
    const result = await soapRequest({
      url: getAllScholarships.getAllScholarshipUrl,
      headers: getAllScholarships.headers,
      xml: util.format(getAllScholarships.body),
    });

    const { body } = result.response;

    const parser = new xml2js.Parser();
    const parsedBody = await parser.parseStringPromise(body);
    const scholarshipData = parsedBody['S:Envelope']['S:Body'][0]['ns2:getAllScholarshipResponse'][0]['return'];

    let userId: string | undefined;
    const accessToken = req.cookies.accToken;

    if (!accessToken) {
      // Get userId from headers
      userId = req.headers['user_id'] as string | undefined;
    } else {
      // Get userId from decoded token
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as any;
      userId = decoded.UserInfo?.user_id as string | undefined;
    }

    // Check if userId is not null or undefined
    if (!userId) {
      res.status(400).json({
        status: "error",
        message: "User ID is missing in headers",
      });
      return;
    }

    const userField =
      !accessToken ? 'user_id_scholarship_php' : 'user_id_scholarship_rest';

    const filteredAssignments = scholarshipData.filter((scholarship: any) => {
      const user_id_scholarship = scholarship[userField]?.[0];
      return user_id_scholarship === (userId as string).toString();
    });      

    if (filteredAssignments.length === 0) {
      res.status(200).json({
        status: "success",
        message: "No assignments found for the user",
        data: [],
      });
      return;
    }

    const scholarshipIds = filteredAssignments.map(
      (scholarship: any) => scholarship.scholarship_id_rest[0]
    );

    const assignments = await prisma.assignment.findMany({
      where: {
        scholarship_id: {
          in: scholarshipIds.map(Number),
        },
      },
      include: {
        scholarship: true,
      },
    });

    if (!assignments) {
      throw new Error("Assignment Not Found!");
    }

    res.status(200).json({
      status: "success",
      message: "Assignments retrieved successfully",
      data: assignments.map((assignment) => {
        return {
          assignment_id: assignment.assignment_id,
          scholarship_id: assignment.scholarship_id,
          assignment_name: assignment.name,
          assignment_description: assignment.desc,
          scholarship_name: assignment.scholarship.title,
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
