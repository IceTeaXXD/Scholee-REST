import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prismaClient = new PrismaClient();

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.sendStatus(400).json({ message: "Email or password empty" });
        }
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
            include: {
                university: true,
                organization: true,
            },
        });
        if (!findUser) {
            res.sendStatus(401);
        } else {
            const match = await bcrypt.compare(password, findUser.password);
            // access and refresh token
            const accessTokenSecret: string = String(
                process.env.ACCESS_TOKEN_SECRET
            );
            const refreshTokenSecret: string = String(
                process.env.REFRESH_TOKEN_SECRET
            );
            if (match) {
                const userType = findUser.university
                    ? "university"
                    : "organization";

                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            email: findUser.email,
                            userType: userType,
                        },
                    },
                    accessTokenSecret,
                    { expiresIn: "1d" }
                );
                const refreshToken = jwt.sign(
                    { email: email, userType: userType },
                    refreshTokenSecret,
                    { expiresIn: "1d" }
                );

                if (userType === "university" || userType === "organization") {
                    const updatedUser = await prismaClient.user.update({
                        where: {
                            user_id: findUser.user_id,
                        },
                        data: {
                            refreshToken,
                        },
                    });
                }
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.json({ userType, accessToken });
            } else {
                res.sendStatus(401);
            }
        }
    } catch (error: any) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const handleLogout = (req: Request, res: Response): void => {
    try {
        // clear from cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};