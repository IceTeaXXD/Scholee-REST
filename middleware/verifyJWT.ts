import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
interface CustomRequest extends Request {
    email: string;
    roles: string[];
    university: string | null;
    organization: string | null;
}
const verifyJWT = (req: Request, res: Response, next:NextFunction): void => {
    var customReq = req as CustomRequest;
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
            (err) => {
                if (err) res.sendStatus(403);
                next();
            }
        )
    }
};

export default verifyJWT;