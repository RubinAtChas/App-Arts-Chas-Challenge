import express from 'express';
import dotenv from 'dotenv';
import { createUserHandler } from '../../handlers/users/createUserHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/create-user:
 *   post:
 *     summary: Skapa en ny användare
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anna Andersson
 *               email:
 *                 type: string
 *                 example: anna@example.com
 *               password:
 *                 type: string
 *                 example: starktlösenord
 *     responses:
 *       200:
 *         description: Användare skapad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Added name - Anna Andersson and email/password to the database
 *       400:
 *         description: Saknade fält
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required
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
router.post('/api/create-user', createUserHandler);

export default router;
