/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Operations related to files
 */
import express from "express"
import { uploadFiles, uploadFile, scoreFile } from "../controllers/files.controller"

import multer from "multer"

const router = express.Router()
const upload = multer()

/**
 * @swagger
 * /files/scholarship/{sid}/assignment/{aid}:
 *   post:
 *     summary: Upload files for a specific assignment
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: sid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Scholarship ID
 *       - in: path
 *         name: aid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               uid:
 *                 type: integer
 *                 description: User ID
 *     responses:
 *       '200':
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 files:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       file_id:
 *                         type: integer
 *                       file_path:
 *                         type: string
 */
router.post('/files/scholarship/:sid/assignment/:aid', upload.any(), async (req: any, res: any) => {
  try {
    const { files } = req;
    const fileUrls = await Promise.all(files.map(async (file: any) => uploadFile(file)));
    console.log('links', fileUrls);
    await uploadFiles(req, res);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch('/files/scholarship/:sid/assignment/:aid', scoreFile);

module.exports = router
