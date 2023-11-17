/**
 * @swagger
 * tags:
 *   name: University
 *   description: Operations related to university information
 */
import express from "express"
import {
  getUniversities,
  getUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversityStats
} from "../controllers/university.controller"

const router = express.Router()

/**
 * @swagger
 * /university:
 *   get:
 *     summary: Get a list of universities
 *     tags: [University]
 *     responses:
 *       '200':
 *         description: Universities retrieved successfully
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
 *                       university_id:
 *                         type: integer
 *                       university_name:
 *                         type: string
 *                       university_email:
 *                         type: string
 *                       university_address:
 *                         type: string
 *                       university_description:
 *                         type: string
 */
router.get('/university', getUniversities);

/**
 * @swagger
 * /university/{id}:
 *   get:
 *     summary: Get university information by ID
 *     tags: [University]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: University retrieved successfully
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
router.get('/university/:id', getUniversity);

/**
 * @swagger
 * /university:
 *   patch:
 *     summary: Update university information by ID
 *     tags: [University]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         description: University data to be updated
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             address:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       '200':
 *         description: University updated successfully
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
router.patch('/university/:id', updateUniversity);
/**
 * @swagger
 * /university:
 *   delete:
 *     summary: Delete university by ID
 *     tags: [University]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: University deleted successfully
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
router.delete('/university/:id', deleteUniversity);

/**
 * @swagger
 * /university/stats/{id}:
 *   get:
 *     summary: Get statistics for a specific university
 *     tags: [University]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name filter for statistics
 *       - in: query
 *         name: itemsperpage
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: integer
 *         description: Current page number
 *     responses:
 *       '200':
 *         description: University statistics retrieved successfully
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
 *                     # Adjust the response structure based on your actual API response
 *                     stats:
 *                       type: object
 *                       description: Statistics for the specified university
 */
router.get('/university/stats/:id', getUniversityStats);

module.exports = router
