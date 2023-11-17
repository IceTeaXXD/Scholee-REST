/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Operations related to student information
 */
import express from "express"
import {
  getUserPhpInfo,
  getStudentFromScholarship
} from "../controllers/student.controller"

const router = express.Router()

/**
 * @swagger
 * /student/user/{uid}:
 *   get:
 *     summary: Get user information from PHP service
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 */
router.get('/user/:uid', getUserPhpInfo);

/**
 * @swagger
 * /student/scholarship/user/{sid}:
 *   get:
 *     summary: Get student information from SOAP service for a specific scholarship
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Student information retrieved successfully
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
 *                     scholarships:
 *                       type: object  # Adjust the type based on the actual response structure
 *                       description: Student information for the specified scholarship
 */
router.get('/scholarship/user/:sid', getStudentFromScholarship);

module.exports = router
