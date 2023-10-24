/**
 * @swagger
 * tags:
 *  name: Scholarship Admin
 *  description: Collection of endpoints related to Scholarship Admin (Users)
 */

/**
 * @swagger
 * /scholarshipadmin:
 *   get:
 *     tags:
 *       - Scholarship Admin
 *     summary: Retrieve all scholarship admins from the database
 *     description: This endpoint retrieves all scholarship admins from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
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
 *                   example: Successfully retrieved all users
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       organization:
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
 * /scholarshipadmin/{id}:
 *   get:
 *     tags:
 *       - Scholarship Admin
 *     summary: Retrieve a specific scholarship admin from the database
 *     description: This endpoint retrieves a specific scholarship admin from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship admin to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the scholarship admin
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
 *                   example: Successfully retrieved user
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     organization:
 *                       type: string
 *       404:
 *         description: Scholarship admin not found
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
 *                   example: User does not exist
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
 * /scholarshipadmin/{id}:
 *   patch:
 *     tags:
 *       - Scholarship Admin
 *     summary: Update a specific scholarship admin in the database
 *     description: This endpoint updates a specific scholarship admin in the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship admin to update
 *         schema:
 *           type: string
 *     requestBody:
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
 *               organization:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the scholarship admin
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
 *                   example: Successfully updated user
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     organization:
 *                       type: string
 *       404:
 *         description: Scholarship admin not found
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
 *                   example: User does not exist
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
 * /scholarshipadmin:
 *   post:
 *     tags:
 *       - Scholarship Admin
 *     summary: Create a new scholarship admin
 *     description: This endpoint creates a new scholarship admin.
 *     requestBody:
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
 *               organization:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created user
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
 *                   example: Successfully created user
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     organization:
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
 * /scholarshipadmin/{id}:
 *   delete:
 *     tags:
 *       - Scholarship Admin
 *     summary: Delete a specific scholarship admin from the database
 *     description: This endpoint deletes a specific scholarship admin from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the scholarship admin to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the scholarship admin
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
 *                   example: Successfully deleted user
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     organization:
 *                       type: string
 *       404:
 *         description: Scholarship admin not found
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
 *                   example: User does not exist
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