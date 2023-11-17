/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Operations related to files
 */
import express from "express"
import { getAllFiles, getFileById } from "../controllers/files.controller"

const router = express.Router()

/**
 * @swagger
 * /files/scholarship/{sid}/assignment/{aid}/file/{fid}/user/{uid}:
 *   get:
 *     summary: Get a specific file by ID
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
 *       - in: path
 *         name: fid
 *         schema:
 *           type: integer
 *         required: true
 *         description: File ID
 *       - in: path
 *         name: uid
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: File retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     file_id:
 *                       type: integer
 *                     file_path:
 *                       type: string
 */
router.get('/files/scholarship/:sid/assignment/:aid/file/:fid/user/:uid', getFileById);

/**
 * @swagger
 * /files/scholarship/{sid}/assignment/{aid}:
 *   get:
 *     summary: Get all files for a specific assignment
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
 *     responses:
 *       '200':
 *         description: Files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     files:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           file_id:
 *                             type: integer
 *                           file_path:
 *                             type: string
 */
router.get('/files/scholarship/:sid/assignment/:aid', getAllFiles);

module.exports = router
