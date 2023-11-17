/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Operations related to organizations
 */
import express from "express"
import {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from "../controllers/organization.controller"

const router = express.Router()

/**
 * @swagger
 * /organization:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       '200':
 *         description: Organizations retrieved successfully
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       organization_id:
 *                         type: integer
 *                       organization_name:
 *                         type: string
 *                       organization_email:
 *                         type: string
 *                       organization_address:
 *                         type: string
 *                       organization_description:
 *                         type: string
 */
router.get('/organization', getOrganizations);

/**
 * @swagger
 * /organization/{id}:
 *   get:
 *     summary: Get a specific organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Organization ID
 *     responses:
 *       '200':
 *         description: Organization retrieved successfully
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
router.get('/organization/:id', getOrganization);

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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               organizationDescription:
 *                 type: string
 *               referral_code:
 *                 type: string
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

/**
 * @swagger
 * /organization/{id}:
 *   patch:
 *     summary: Update an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Organization ID
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
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Organization updated successfully
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
router.patch('/organization/:id', updateOrganization);

/**
 * @swagger
 * /organization/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Organization ID
 *     responses:
 *       '200':
 *         description: Organization deleted successfully
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
router.delete('/organization/:id', deleteOrganization);

module.exports = router
