import express from "express";
import {
    uploadFiles,
    uploadFile
} from "../controllers/files.controller";

import multer from 'multer';

const router = express.Router()
const upload = multer()

router.post("/files/scholarship/:sid/assignment/:aid", upload.any(), async(req : any, res : any) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { body, files } = req;

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }
        uploadFiles;
        res.status(200).send("Form Submitted");
    } catch (error : any) {
        res.send(error.message);
    }
})

module.exports = router