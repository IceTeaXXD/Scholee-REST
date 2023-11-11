import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  verify,
  sign,
  TokenExpiredError,
  JsonWebTokenError
} from "jsonwebtoken"

const prismaClient = new PrismaClient()

const generateAccessToken = (
  user_id: number,
  name: string,
  email: string,
  roles: string,
  accessTokenSecret: string
): string => {
  const accessToken: string = jwt.sign(
    {
      UserInfo: {
        user_id,
        name,
        email,
        roles
      }
    },
    accessTokenSecret,
    { expiresIn: "1m" }
  )

  return accessToken
}

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.sendStatus(400).json({ message: "Email or password empty" })
    }
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: email
      },
      include: {
        university: true,
        organization: true
      }
    })
    if (!findUser) {
      res.sendStatus(401)
    } else {
      const match = await bcrypt.compare(password, findUser.password)

      const accessTokenSecret: string = String(process.env.ACCESS_TOKEN_SECRET)
      const refreshTokenSecret: string = String(
        process.env.REFRESH_TOKEN_SECRET
      )
      if (match) {
        const userType = findUser.university ? "university" : "organization"
        const accessToken = generateAccessToken(
          findUser.user_id,
          findUser.name,
          findUser.email,
          userType,
          accessTokenSecret
        )
        res.cookie("accToken", accessToken, {
          maxAge: 1 * 60 * 1000
        })
        const refreshToken = jwt.sign(
          { user_id: findUser.user_id, email: email, userType: userType },
          refreshTokenSecret,
          { expiresIn: "1d" }
        )

        if (userType === "university" || userType === "organization") {
          const updatedUser = await prismaClient.user.update({
            where: {
              user_id: findUser.user_id
            },
            data: {
              refreshToken
            }
          })
        }
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ user_id: findUser.user_id, email, userType, accessToken })
      } else {
        res.sendStatus(401)
      }
    }
  } catch (error: any) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const handleGetInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accessToken = req.cookies.accToken

  if (!accessToken) {
    res.status(401).json({ message: "Access token missing" })
    return
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as any
    res.json({
      user_id: decoded.UserInfo.user_id,
      email: decoded.UserInfo.email,
      name: decoded.UserInfo.name,
      roles: decoded.UserInfo.roles
    })
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Access token expired" })
    } else if (error instanceof JsonWebTokenError) {
      console.error("JWT Error:", error.message)
      res.status(403).json({ message: "Invalid token" })
    } else {
      console.error("Unknown error:", error)
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export const handleLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      res.sendStatus(204)
    }

    const refreshToken = cookies.jwt
    // Find the user by refreshToken and clear the refreshToken
    const findUser = await prismaClient.user.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })

    if (!findUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true
      })
      res.sendStatus(204)
    }

    // Clear the refreshToken in the database
    await prismaClient.user.update({
      where: { user_id: findUser?.user_id },
      data: {
        refreshToken: ""
      }
    })

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true
    })
    res.clearCookie("accToken")
    res.json({ message: "Successfully Logout" })
  } catch (error: any) {
    console.error(error)
    res.sendStatus(500)
  } finally {
    await prismaClient.$disconnect()
  }
}

export const handleRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    res.sendStatus(401)
    return
  }

  const refreshToken: string = cookies.jwt
  try {
    const findUser = await prismaClient.user.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })

    if (!findUser) {
      res.sendStatus(403)
      return
    }

    verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, decoded: any) => {
        if (err || !findUser || findUser.email !== decoded.email) {
          res.sendStatus(403)
          return
        }
        const name = findUser.name
        const email = findUser.email
        const roles = findUser.role
        const accessTokenSecret: string = String(
          process.env.ACCESS_TOKEN_SECRET
        )
        const accessToken = generateAccessToken(
          findUser.user_id,
          findUser.name,
          findUser.email,
          roles,
          accessTokenSecret
        )
        res.cookie("accToken", accessToken, {
          maxAge: 1 * 60 * 1000
        })
        res.json({ user_id: findUser.user_id, email, name, roles, accessToken })
      }
    )
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
    return
  }
}
