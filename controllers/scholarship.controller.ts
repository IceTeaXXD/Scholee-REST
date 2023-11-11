import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()

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
      type
    } = req.body

    const existingOrganization = await prisma.organization.findUnique({
      select: {
        user: {
          select: {
            name: true
          }
        }
      },
      where: {
        organization_id
      }
    })

    if (!existingOrganization) {
      throw new Error("Organization not found")
    }

    const scholarship = await prisma.scholarship.create({
      data: {
        title,
        description,
        short_description,
        coverage,
        contact_name,
        contact_email,
        organization_id,
        scholarshiptype: {
          create: type.map((element: string) => ({
            type: element
          }))
        }
      },
      include: {
        scholarshiptype: true
      }
    })

    res.status(201).json({
      status: "success",
      message: "Scholarship created successfully",
      data: {
        organization_id: scholarship.organization_id,
        scholarship_id: scholarship.scholarship_id,
        title: scholarship.title,
        description: scholarship.description,
        short_description: scholarship.short_description,
        coverage: scholarship.coverage,
        contact_name: scholarship.contact_name,
        contact_email: scholarship.contact_email,
        type: scholarship.scholarshiptype
      }
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const getScholarships = async (req: Request, res: Response) => {
  try {
    const {
      title,
      minCoverage,
      maxCoverage,
      types,
      itemsPerPage,
      currentPage
    } = req.query

    const accessToken = req.cookies.accToken

    if (!accessToken) {
      res.status(401).json({ message: "Access token missing" })
      return
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any
    const user_id = decoded.UserInfo.user_id
    const whereCondition: Prisma.ScholarshipWhereInput = {
      title: title
        ? { contains: String(title), mode: "insensitive" }
        : undefined,
      coverage: {
        gte:
          minCoverage && Number(minCoverage) > 0
            ? Number(minCoverage)
            : undefined,
        lte:
          maxCoverage && Number(maxCoverage) > 0
            ? Number(maxCoverage)
            : undefined
      },
      scholarshiptype: {
        some: {
          type: types ? { in: String(types).split(",") } : undefined
        }
      },
      organization_id: user_id ? { equals: Number(user_id) } : undefined
    }

    const scholarships = await prisma.scholarship.findMany({
      where: whereCondition,
      include: {
        scholarshiptype: true
      },
      skip: (Number(itemsPerPage) || 0) * ((Number(currentPage) || 1) - 1),
      take: Number(itemsPerPage) || 100
    })

    const totalScholarships = await prisma.scholarship.count({
      where: whereCondition
    })

    const numberOfPages = Math.ceil(
      totalScholarships / (Number(itemsPerPage) || 100)
    )

    res.status(200).json({
      status: "success",
      message: "Scholarships retrieved successfully",
      numberOfPages,
      data: scholarships.map((scholarship) => {
        return {
          organization_id: scholarship.organization_id,
          scholarship_id: scholarship.scholarship_id,
          title: scholarship.title,
          description: scholarship.description,
          short_description: scholarship.short_description,
          coverage: scholarship.coverage,
          contact_name: scholarship.contact_name,
          contact_email: scholarship.contact_email,
          type: scholarship.scholarshiptype
        }
      })
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const getScholarship = async (req: Request, res: Response) => {
  try {
    const scholarship = await prisma.scholarship.findUnique({
      where: {
        scholarship_id: Number(req.params.id)
      },
      include: {
        scholarshiptype: true,
        organization: true
      }
    })

    if (!scholarship) {
      throw new Error("Scholarship not found")
    }

    res.status(200).json({
      status: "success",
      message: "Scholarship retrieved successfully",
      data: {
        organization_id: scholarship.organization_id,
        scholarship_id: scholarship.scholarship_id,
        title: scholarship.title,
        description: scholarship.description,
        short_description: scholarship.short_description,
        coverage: scholarship.coverage,
        contact_name: scholarship.contact_name,
        contact_email: scholarship.contact_email,
        type: scholarship.scholarshiptype
      }
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const updateScholarship = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      short_description,
      coverage,
      contact_name,
      contact_email,
      type
    } = req.body
    const { id } = req.params
    const existingScholarship = await prisma.scholarship.findUnique({
      where: {
        scholarship_id: Number(id)
      },
      include: {
        scholarshiptype: true,
        organization: true
      }
    })

    if (!existingScholarship) {
      return res.status(404).json({ message: "Scholarship not found" })
    }

    const updatedScholarship = await prisma.scholarship.update({
      where: {
        scholarship_id: Number(id)
      },
      data: {
        title,
        description,
        short_description,
        coverage,
        contact_name,
        contact_email,
        scholarshiptype: {
          deleteMany: {
            scholarship_id: Number(id)
          },
          create: type.map((element: string) => ({
            type: element
          }))
        }
      },
      include: {
        scholarshiptype: true,
        organization: true
      }
    })

    res.status(200).json({
      status: "success",
      message: "Scholarship updated successfully",
      data: {
        organization_id: updatedScholarship.organization_id,
        scholarship_id: updatedScholarship.scholarship_id,
        title: updatedScholarship.title,
        description: updatedScholarship.description,
        short_description: updatedScholarship.short_description,
        coverage: updatedScholarship.coverage,
        contact_name: updatedScholarship.contact_name,
        contact_email: updatedScholarship.contact_email,
        type: updatedScholarship.scholarshiptype
      }
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const getAllScholarshipTypes = async (req: Request, res: Response) => {
  try {
    const scholarshipTypes = await prisma.scholarshipType.findMany({
      select: {
        type: true
      }
    })

    const uniqueTypes = [
      ...new Set(
        scholarshipTypes.map((scholarshipType) => scholarshipType.type)
      )
    ]

    res.status(200).json({
      status: "success",
      message: "Scholarship types retrieved successfully",
      data: uniqueTypes
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

export const deleteScholarship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existingScholarship = await prisma.scholarship.findUnique({
      where: {
        scholarship_id: Number(id)
      },
      include: {
        scholarshiptype: true,
        organization: true
      }
    })

    if (!existingScholarship) {
      throw new Error("Scholarship not found")
    }

    const scholarship = await prisma.scholarship.delete({
      where: {
        scholarship_id: Number(id)
      },
      include: {
        scholarshiptype: true,
        organization: true
      }
    })

    res.status(200).json({
      status: "success",
      message: "Scholarship deleted successfully",
      data: {
        organization_id: scholarship.organization_id,
        scholarship_id: scholarship.scholarship_id,
        title: scholarship.title,
        description: scholarship.description,
        short_description: scholarship.short_description,
        coverage: scholarship.coverage,
        contact_name: scholarship.contact_name,
        contact_email: scholarship.contact_email,
        type: scholarship.scholarshiptype
      }
    })
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}
