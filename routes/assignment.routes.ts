import express from "express"
import {
    createAssignment,
    getAssignment,
    getAssignmentAll,
    uploadFile
    getAssignmentBySid
} from "../controllers/assignment.controller"
import multer from 'multer';

const router = express.Router()

const upload = multer()

router.post("/assignment/create", createAssignment)
router.get("/assignment/:sid/:aid", getAssignment)
router.get("/assignment", getAssignmentAll)
router.post("/assignment/upload", upload.any(), async(req : any,res : any) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { body, files } = req;

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }

        res.status(200).send("Form Submitted");
    } catch (error : any) {
        res.send(error.message);
    }
})
router.get("/assignment/:sid", getAssignmentBySid)

module.exports = router
