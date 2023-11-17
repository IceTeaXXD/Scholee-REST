/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

import express from 'express';
import {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleGetInfo,
} from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in and obtain access and refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.post('/login', handleLogin);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out and invalidate refresh token
 *     tags: [Authentication]
 *     responses:
 *       '204':
 *         description: Successful logout
 *       '500':
 *         description: Internal server error
 */
router.post('/logout', handleLogout);

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token using a valid refresh token
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully
 *       '401':
 *         description: Invalid or expired refresh token
 *       '500':
 *         description: Internal server error
 */
router.get('/refresh', handleRefreshToken);

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Get user information from the access token
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *       '401':
 *         description: Invalid or expired access token
 *       '403':
 *         description: Invalid token or user not authorized
 *       '500':
 *         description: Internal server error
 */
router.get('/info', handleGetInfo);

module.exports = router
