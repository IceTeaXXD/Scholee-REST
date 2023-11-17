/**
 * @swagger
 * tags:
 *   name: SOAP
 *   description: Operations related to SOAP requests
 */
import express from "express"
import { scholarshipAcceptance } from "../controllers/soap.controller"
const router = express.Router()

/**
 * @swagger
 * /soap/setacceptance:
 *   post:
 *     summary: Update scholarship acceptance status via SOAP
 *     tags: [SOAP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id_student:
 *                 type: integer
 *               scholarship_id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Scholarship acceptance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.post('/setacceptance', scholarshipAcceptance);

module.exports = router
