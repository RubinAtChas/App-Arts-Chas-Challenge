import express from 'express';
import dotenv from 'dotenv';
import { getPlants } from '../../handlers/plants/getPlantsHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/{userId}/get-flowers:
 *   get:
 *     summary: Hämta alla växter för en användare
 *     tags:
 *       - Flowers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lyckad hämtning av växter
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   flower_id:
 *                     type: string
 *                   flower_name:
 *                     type: string
 *                   last_watered:
 *                     type: string
 *                     format: date-time
 *                   watering_interval:
 *                     type: number
 *                   moisture:
 *                     type: number
 *                   flower_temp:
 *                     type: number
 *                   dirt_temp:
 *                     type: number
 *                   sunlight:
 *                     type: number
 *                   nitrogen_level:
 *                     type: number
 *                   phosphor:
 *                     type: number
 *                   potassium:
 *                     type: number
 *                   users:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                       name:
 *                         type: string
 *       404:
 *         description: Inga växter hittades
 */
router.get('/api/:userId/get-flowers', getPlants);

export default router;
