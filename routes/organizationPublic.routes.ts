/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Operations related to organizations
 */

import express from "express"
import { createOrganization } from "../controllers/organization.controller"

const router = express.Router()

/**
 * @swagger
 * /organization:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the organization.
 *               email:
 *                 type: string
 *                 description: The email address of the organization.
 *               password:
 *                 type: string
 *                 description: The password for the organization.
 *               address:
 *                 type: string
 *                 description: The address of the organization.
 *               organizationDescription:
 *                 type: string
 *                 description: The description of the organization.
 *               referral_code:
 *                 type: string
 *                 description: The referral code for the organization.
 *     responses:
 *       '200':
 *         description: Organization created successfully
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
 *                     organization_id:
 *                       type: integer
 *                     organization_name:
 *                       type: string
 *                     organization_email:
 *                       type: string
 *                     organization_address:
 *                       type: string
 *                     organization_description:
 *                       type: string
 */
router.post('/organization', createOrganization);
module.exports = router
