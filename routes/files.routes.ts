import express from "express"
import {
    getAllFiles,
    getFileById,
    uploadFiles
} from "../controllers/files.controller"

const router = express.Router()

router.get("/files/scholarship/:sid/assignment/:aid/file/:fid/user/:uid", getFileById)
router.get("/files/scholarship/:sid/assignment/:aid", getAllFiles)
router.post("/files/scholarship/:sid/assignment/:aid", uploadFiles)

module.exports = router
