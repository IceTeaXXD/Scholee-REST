import { Request, Response } from "express"
import axios from 'axios'

export const getUserPhpInfo = async (req : Request, res : Response) => {
    try {
        const uid = req.params.uid
        const URL = process.env.MONOLITH_URL + "/api/profile/info.php?userid=" + uid
        const response = await axios.get(URL);
        const { name, email } = response.data;
        res.status(200).json({
            status: "success",
            message: "Assignment retrieved successfully",
            data: {
                user: {
                    name,
                    email,
                },
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};