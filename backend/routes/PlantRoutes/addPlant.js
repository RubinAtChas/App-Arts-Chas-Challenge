import express from 'express';
import dotenv from 'dotenv';
import { addPlant } from '../../handlers/plants/addPlantHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/{userId}/add-flower:
 *   post:
 *     summary: Lägg till en blomma för en användare
 *     tags:
 *       - Flowers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för användaren
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flower_name
 *             properties:
 *               flower_name:
 *                 type: string
 *               last_watered:
 *                 type: string
 *                 format: date-time
 *               watering_interval:
 *                 type: number
 *               moisture:
 *                 type: number
 *               flower_temp:
 *                 type: number
 *               dirt_temp:
 *                 type: number
 *               sunlight:
 *                 type: number
 *               nitrogen_level:
 *                 type: number
 *               phosphor:
 *                 type: number
 *               potassium:
 *                 type: number
 *     responses:
 *       200:
 *         description: Växt tillagd
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Ogiltig begäran – växtnamn
 */
router.post('/api/:userId/add-flower', addPlant);

export default router;
