import { Request, Response } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { Prisma, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.sendStatus(401);
    }

    const refreshToken: string = cookies.jwt;

    try {
        const findUser = await prismaClient.user.findFirst({
            where: {
                refreshToken: refreshToken,
            },
        });

        if (!findUser) {
            res.sendStatus(403); 
        }

        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded: any) => {
            if (err || !findUser || findUser.email !== decoded.email) {
                res.sendStatus(403);
                return;
            }
            const email = findUser.email;
            const roles = findUser.role;
            const accessToken: string = sign(
                {
                    UserInfo: {
                        email: decoded.email,
                        roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '10m' }
            );

            res.json({ email,roles, accessToken });
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export { handleRefreshToken };
