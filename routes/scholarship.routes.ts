/**
 * @swagger
 * tags:
 *   name: Scholarships
 *   description: Operations related to scholarships
 */
import express from "express"
import {
  createScholarship,
  getScholarships,
  getScholarship,
  updateScholarship,
  deleteScholarship,
  getAllScholarshipTypes,
  scholarshipAcceptance,
  getCountOfUser
} from "../controllers/scholarship.controller"

const router = express.Router()

/**
 * @swagger
 * /scholarship:
 *   post:
 *     summary: Create a new scholarship
 *     tags: [Scholarships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               short_description:
 *                 type: string
 *               coverage:
 *                 type: string
 *               contact_name:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               organization_id:
 *                 type: integer
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Scholarship created successfully
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
 *                     scholarship_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     short_description:
 *                       type: string
 *                     coverage:
 *                       type: string
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.post('/scholarship', createScholarship);

/**
 * @swagger
 * /scholarship:
 *   get:
 *     summary: Get scholarships
 *     tags: [Scholarships]
 *     parameters:
 *       - name: title
 *         in: query
 *         description: Scholarship title for filtering
 *         schema:
 *           type: string
 *       - name: minCoverage
 *         in: query
 *         description: Minimum coverage for filtering
 *         schema:
 *           type: string
 *       - name: maxCoverage
 *         in: query
 *         description: Maximum coverage for filtering
 *         schema:
 *           type: string
 *       - name: types
 *         in: query
 *         description: Scholarship types for filtering (comma-separated)
 *         schema:
 *           type: string
 *       - name: itemsPerPage
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *       - name: currentPage
 *         in: query
 *         description: Current page number
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Scholarships retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 numberOfPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       organization_id:
 *                         type: integer
 *                       scholarship_id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       short_description:
 *                         type: string
 *                       coverage:
 *                         type: string
 *                       contact_name:
 *                         type: string
 *                       contact_email:
 *                         type: string
 *                       type:
 *                         type: array
 *                         items:
 *                           type: string
 *                       count:
 *                         type: integer
 */
router.get('/scholarship', getScholarships);

/**
 * @swagger
 * /scholarship/{id}:
 *   get:
 *     summary: Get a scholarship by ID
 *     tags: [Scholarships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the scholarship to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Scholarship retrieved successfully
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
 *                     scholarship_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     short_description:
 *                       type: string
 *                     coverage:
 *                       type: string
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.get('/scholarship/:id', getScholarship);

/**
 * @swagger
 * /scholarship/{id}:
 *   patch:
 *     summary: Update a scholarship by ID
 *     tags: [Scholarships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the scholarship to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               short_description:
 *                 type: string
 *               coverage:
 *                 type: string
 *               contact_name:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               type:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Scholarship updated successfully
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
 *                     scholarship_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     short_description:
 *                       type: string
 *                     coverage:
 *                       type: string
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.patch('/scholarship/:id', updateScholarship);

/**
 * @swagger
 * /scholarship/{id}:
 *   delete:
 *     summary: Delete a scholarship by ID
 *     tags: [Scholarships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the scholarship to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Scholarship deleted successfully
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
 *                     scholarship_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     short_description:
 *                       type: string
 *                     coverage:
 *                       type: string
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.delete('/scholarship/:id', deleteScholarship);

/**
 * @swagger
 * /scholarshiptype:
 *   get:
 *     summary: Get all scholarship types
 *     tags: [Scholarships]
 *     responses:
 *       '200':
 *         description: Scholarship types retrieved successfully
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
 *                     type: string
 */
router.get('/scholarshiptype', getAllScholarshipTypes);

/**
 * @swagger
 * /scholarship/{id}/count:
 *   get:
 *     summary: Get count of scholarships for a user
 *     tags: [Scholarships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user (organization)
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Count of scholarships retrieved successfully
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
 *                   type: integer
 */
router.get('/scholarship/:id/count', getCountOfUser);

/**
 * @swagger
 * /scholarship/acceptance/{sid}:
 *   post:
 *     summary: Update scholarship acceptance status
 *     tags: [Scholarships]
 *     parameters:
 *       - name: sid
 *         in: path
 *         required: true
 *         description: ID of the scholarship to update acceptance status
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               user_id:
 *                 type: integer
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     scholarship_id:
 *                       type: integer
 *                     scholarship_name:
 *                       type: string
 *                     status:
 *                       type: string
 */
router.post('/scholarship/acceptance/:sid', scholarshipAcceptance);
module.exports = router
