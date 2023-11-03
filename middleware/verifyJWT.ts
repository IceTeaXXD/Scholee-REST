import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
interface CustomRequest extends Request {
    email: string;
    roles: string[];
    university: string | null;
    organization: string | null;
}
const verifyJWT = (req: Request, res: Response, next:NextFunction): void => {
    const customReq = req as CustomRequest;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const authHeaderString = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!authHeaderString?.startsWith('Bearer ')) {
        res.sendStatus(401);
    } else {
        const token = authHeaderString.split(' ')[1];
        console.log(token);
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err, decoded) => {
                if (err) res.sendStatus(403);
                const { UserInfo } = decoded as { UserInfo: { email: string, roles: string[], university: string, organization: string } };
                if (UserInfo.roles.includes('university')) {
                    customReq.email = UserInfo.email;
                    customReq.roles = UserInfo.roles;
                    customReq.organization = null;
                    customReq.university = UserInfo.university;
                } else if (UserInfo.roles.includes('organization')) {
                    customReq.email = UserInfo.email;
                    customReq.roles = UserInfo.roles;
                    customReq.university = null; 
                    customReq.organization = UserInfo.organization;
                }
                next();
            }
        )
    }
};

export default verifyJWT;