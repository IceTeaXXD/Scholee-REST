import express from "express";
import { getAllFiles, getFileById, uploadFiles } from "../controllers/files.controller";

const router = express.Router();

router.get("/scholarship/:sid/assignment/:aid/file/:fid/user/:uid", getFileById)
router.get("/scholarship/:sid/assignment/:aid/file", getAllFiles)
router.post("/scholarship/:sid/assignment/:aid/", uploadFiles)

module.exports = router