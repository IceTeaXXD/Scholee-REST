/**
 * @swagger
 * tags:
 *   name: University
 *   description: Operations related to university information
 */
import express from "express"
import { createUniversity } from "../controllers/university.controller"

const router = express.Router()

/**
 * @swagger
 * /university:
 *   post:
 *     summary: Create a new university
 *     tags: [University]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               universityDescription:
 *                 type: string
 *     responses:
 *       '200':
 *         description: University created successfully
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
 *                     university_id:
 *                       type: integer
 *                     university_name:
 *                       type: string
 *                     university_email:
 *                       type: string
 *                     university_address:
 *                       type: string
 *                     university_description:
 *                       type: string
 */
router.post('/university', createUniversity);

module.exports = router
