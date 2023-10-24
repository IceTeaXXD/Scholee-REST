/**
 * @swagger
 * tags:
 *   name: Scholarship
 *   description: Collection of endpoints related to Scholarship
 */

/**
 * @swagger
 * /scholarship:
 *   get:
 *     tags:
 *       - Scholarship
 *     summary: Retrieve all scholarships from the database
 *     description: This endpoint retrieves all scholarships from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all scholarships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved all scholarships
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
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
 *                         type: integer
 *                       contact_name:
 *                         type: string
 *                       contact_email:
 *                         type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 *                 data:
 *                   type: string
 *                   example: null
 */


/**
 * @swagger
 * /scholarship/{id}:
 *   get:
 *     tags:
 *       - Scholarship
 *     summary: Retrieve a specific scholarship from the database using its ID
 *     description: This endpoint retrieves a specific scholarship from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the scholarship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved scholarship
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
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
 *                       type: integer
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *       404:
 *         description: Scholarship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Scholarship not found
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /scholarship:
 *   post:
 *     tags:
 *       - Scholarship
 *     summary: Create a new scholarship
 *     description: This endpoint creates a new scholarship.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               short_description:
 *                 type: string
 *               coverage:
 *                 type: integer
 *               contact_name:
 *                 type: string
 *               contact_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created the scholarship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully created scholarship
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
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
 *                       type: integer
 *                     contact_name:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /scholarship/{id}:
 *   patch:
 *     tags:
 *       - Scholarship
 *     summary: Update a specific scholarship
 *     description: This endpoint updates a specific scholarship using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship to update
 *         schema:
 *           type: string
 *     requestBody:
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
 *     responses:
 *       200:
 *         description: Successfully updated the scholarship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully updated scholarship
 *                 data:
 *                   type: object
 *                   properties:
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
 *       404:
 *         description: Scholarship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Scholarship not found
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 *                 data:
 *                   type: string
 *                   example: null
 */

/**
 * @swagger
 * /scholarship/{id}:
 *   delete:
 *     tags:
 *       - Scholarship
 *     summary: Delete a specific scholarship
 *     description: This endpoint deletes a specific scholarship using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the scholarship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Successfully deleted scholarship
 *                 data:
 *                   type: object
 *                   properties:
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
 *       404:
 *         description: Scholarship not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Scholarship not found
 *                 data:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Error message
 *                 data:
 *                   type: string
 *                   example: null
 */