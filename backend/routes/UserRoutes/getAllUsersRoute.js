import express from 'express';
import dotenv from 'dotenv';
import { getAllUsersHandler } from '../../handlers/users/getAllUsersHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/get-users:
 *   get:
 *     summary: Hämta alla användare
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lyckad hämtning av användare
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Anna Andersson
 *                   email:
 *                     type: string
 *                     example: anna@example.com
 *       500:
 *         description: Databasfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong with the database request
 */
router.get('/api/get-users', getAllUsersHandler);

export default router;
