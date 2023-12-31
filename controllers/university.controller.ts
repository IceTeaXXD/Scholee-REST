import { PrismaClient, Role } from "@prisma/client"
import { Request, Response } from "express"
import crypro from "crypto"
import { hash } from "bcrypt"
import { getAllUniversities } from "../templates/university"

const prisma = new PrismaClient()
const fetch = require("node-fetch")
const xml2js = require("xml2js")
const soapRequest = require("easy-soap-request")
const util = require("util")

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const { name, email, password, address, universityDescription } = req.body

    // If email exists, throw error
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user) {
      throw new Error("Email already exists")
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: Role.university,
        university: {
          create: {
            description: universityDescription
          }
        },
        verification: {
          create: {
            verification_token: crypro.randomBytes(8).toString("hex")
          }
        }
      }
    })

    res.status(200).json({
      status: "success",
      message: "University created successfully",
      data: {
        university_id: newUser.user_id,
        university_name: newUser.name,
        university_email: newUser.email,
        university_address: newUser.address,
        university_description: universityDescription
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const getUniversities = async (req: Request, res: Response) => {
  try {
    const universities = await prisma.university.findMany({
      select: {
        university_id: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true
          }
        },
        description: true
      }
    })

    res.status(200).json({
      status: "success",
      message: "Universities retrieved successfully",
      data: universities.map((university) => {
        return {
          university_id: university.university_id,
          university_name: university.user?.name,
          university_email: university.user?.email,
          university_address: university.user?.address,
          university_description: university.description
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

export const getUniversity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const university = await prisma.university.findUnique({
      where: {
        university_id: Number(id)
      },
      select: {
        university_id: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true
          }
        },
        description: true
      }
    })

    if (!university) {
      throw new Error("University not found")
    }

    res.status(200).json({
      status: "success",
      message: "University retrieved successfully",
      data: {
        university_id: university.university_id,
        university_name: university.user?.name,
        university_email: university.user?.email,
        university_address: university.user?.address,
        university_description: university.description
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const updateUniversity = async (req: Request, res: Response) => {
  try {
    const { name, email, address, description } = req.body
    const { id } = req.params

    const university = await prisma.university.findUnique({
      where: {
        university_id: Number(id)
      },
      select: {
        university_id: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true
          }
        },
        description: true
      }
    })

    if (!university) {
      throw new Error("University not found")
    }

    const updatedUniversity = await prisma.university.update({
      where: {
        university_id: Number(id)
      },
      data: {
        description,
        user: {
          update: {
            name,
            email,
            address
          }
        }
      },
      select: {
        university_id: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true
          }
        },
        description: true
      }
    })

    res.status(200).json({
      status: "success",
      message: "University updated successfully",
      data: {
        university_id: updatedUniversity.university_id,
        university_name: updatedUniversity.user?.name,
        university_email: updatedUniversity.user?.email,
        university_address: updatedUniversity.user?.address,
        university_description: updatedUniversity.description
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const deleteUniversity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const university = await prisma.university.findUnique({
      where: {
        university_id: Number(id)
      },
      select: {
        university_id: true,
        user: {
          select: {
            name: true,
            email: true,
            address: true
          }
        },
        description: true
      }
    })

    if (!university) {
      throw new Error("University not found")
    }

    // delete the user
    await prisma.user.delete({
      where: {
        user_id: Number(id)
      }
    })

    res.status(200).json({
      status: "success",
      message: "University deleted successfully",
      data: {
        university_id: university.university_id,
        university_name: university.user?.name,
        university_email: university.user?.email,
        university_address: university.user?.address,
        university_description: university.description
      }
    })
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    })
  }
}

export const getUniversityStats = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, itemsperpage, currentPage } = req.query

  /* Find the PHP ID */
  const { response } = await soapRequest({
    url: getAllUniversities.url,
    headers: getAllUniversities.headers,
    xml: getAllUniversities.body
  })

  const { body } = response

  const parser = new xml2js.Parser()
  const parsedBody = await parser.parseStringPromise(body)
  const universities =
    parsedBody["S:Envelope"]["S:Body"][0]["ns2:getAllUniversitiesResponse"][0][
      "return"
    ]

  /* Fetch the phpUniId where restUniId = id */
  if (!universities || !Array.isArray(universities)) {
    res.status(404).json({ error: "University not found" })
  } else {
    const uniObj = universities.find((univ: any) => univ.restUniId[0] == id)

    const phpId = uniObj ? uniObj.phpUniId[0] : null

    const url = new URL(process.env.MONOLITH_URL + "/api/university/stats.php")
    const params = new URLSearchParams()
    params.append("uid", phpId)
    if (itemsperpage) {
      params.append("name", name ? String(name) : "")
      params.append("itemsperpage", itemsperpage ? String(itemsperpage) : "")
      params.append("currentpage", currentPage ? String(currentPage) : "")
    }
    url.search = params.toString()
    const universityAll = await fetch(url.toString())
    const universityJSON = await universityAll.json()

    if (universityJSON) {
      res.status(200).json({
        message: "Success",
        data: universityJSON
      })
    } else {
      res.status(404).json({ error: "University not found" })
    }
  }
}
