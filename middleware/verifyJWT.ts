import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

interface CustomRequest extends Request {
  name: string;
  email: string;
  roles: string[];
  university: string | null;
  organization: string | null;
}

const prismaClient = new PrismaClient();

const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.cookies.accToken;
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    res.sendStatus(401);
  } else {
    try {
      const apiKeyData = await prismaClient.apikeys.findMany({
        where: {
          key_value: apiKey as string,
        },
      });
      if (apiKeyData.length === 0) {
        res.sendStatus(401);
      } else {
        jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET as string,
          (err: any) => {
            if (err) {
              res.sendStatus(403);
            } else {
              next();
            }
          }
        );
      }
    } catch (error : any) {
      console.error(error.message);
      res.sendStatus(500);
    }
  }
};

export default verifyJWT;
