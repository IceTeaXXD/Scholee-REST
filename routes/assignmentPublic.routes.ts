import {
  getAssignmentBySid,
  getAssignment
} from "../controllers/assignment.controller"
import express from "express"

const router = express.Router()

/**
 * @swagger
 * /api/assignment/{sid}/{aid}:
 *   get:
 *     summary: Get assignment details
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: Scholarship ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: aid
 *         required: true
 *         description: Assignment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Assignment retrieved successfully
 *               data:
 *                 assignments:
 *                   - assignment_id: 1
 *                     scholarship_id: 123
 *                     assignment_name: Example Assignment
 *                     assignment_description: Assignment description
 *                     scholarship_name: Example Scholarship
 *       400:
 *         description: Bad request or missing parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Some error message
 */
router.get("/assignment/:sid/:aid", getAssignment);

/**
 * @swagger
 * /api/assignment/{sid}:
 *   get:
 *     summary: Get assignments by scholarship ID
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         description: Scholarship ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignments retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Assignments retrieved successfully
 *               data:
 *                 assignments:
 *                   - assignment_id: 1
 *                     scholarship_id: 123
 *                     assignment_name: Example Assignment
 *                     assignment_description: Assignment description
 *                     scholarship_name: Example Scholarship
 *                   - assignment_id: 2
 *                     scholarship_id: 123
 *                     assignment_name: Another Assignment
 *                     assignment_description: Another Assignment description
 *                     scholarship_name: Example Scholarship
 *       400:
 *         description: Bad request or missing parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Some error message
 */
router.get("/assignment/:sid", getAssignmentBySid);

module.exports = router
