import express from "express"
import { uploadFiles, uploadFile } from "../controllers/files.controller"

import multer from "multer"

const router = express.Router()
const upload = multer()

router.post(
  "/files/scholarship/:sid/assignment/:aid",
  upload.any(),
  async (req: any, res: any) => {
    try {
      const { files } = req
      const fileUrls = await Promise.all(
        files.map(async (file: any) => uploadFile(file))
      )
      console.log("links", fileUrls)
      await uploadFiles(req, res)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
)

module.exports = router
