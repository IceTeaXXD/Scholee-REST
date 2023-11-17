import express from "express";
import {
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignment.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: API endpoints for assignments
 */

/**
 * @swagger
 * /api/assignment:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scholarship_id:
 *                 type: string
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Assignment created successfully
 *               data:
 *                 assignment_id: 1
 *                 organization_id: 123
 *                 assignment_name: Example Assignment
 *                 assignment_description: Assignment description
 *                 scholarship_id: 456
 *       400:
 *         description: Bad request or missing parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Some error message
 */
router.post("/assignment", createAssignment);

/**
 * @swagger
 * /api/assignment/{sid}/{aid}:
 *   patch:
 *     summary: Update an assignment
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Assignment updated successfully
 *               data:
 *                 assignment_id: 1
 *                 organization_id: 123
 *                 assignment_name: Updated Assignment
 *                 assignment_description: Updated Assignment description
 *                 scholarship_id: 456
 *       400:
 *         description: Bad request or missing parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Some error message
 */
router.patch("/assignment/:sid/:aid", updateAssignment);

/**
 * @swagger
 * /api/assignment/{sid}/{aid}:
 *   delete:
 *     summary: Delete an assignment
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
 *         description: Assignment deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Assignment deleted successfully
 *       400:
 *         description: Bad request or missing parameters
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Some error message
 */
router.delete("/assignment/:sid/:aid", deleteAssignment);



module.exports = router;