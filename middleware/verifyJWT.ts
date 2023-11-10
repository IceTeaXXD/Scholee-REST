import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
interface CustomRequest extends Request {
  name: string
  email: string
  roles: string[]
  university: string | null
  organization: string | null
}
const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accToken

  if (!accessToken) {
    res.sendStatus(401)
  } else {
    console.log(accessToken)
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: any) => {
        if (err) res.sendStatus(403)
        next()
      }
    )
  }
}

export default verifyJWT
