import express from 'express';
import dotenv from 'dotenv';
import { updateSensorData } from '../../handlers/sensors/updateSensorDataHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/sensor/update/{flowerId}:
 *   put:
 *     summary: Uppdatera sensorvärden för en blomma
 *     tags:
 *       - Sensor
 *     parameters:
 *       - in: path
 *         name: flowerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för blomman
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moisture:
 *                 type: number
 *                 example: 45.2
 *               flower_temp:
 *                 type: number
 *                 example: 22.5
 *               dirt_temp:
 *                 type: number
 *                 example: 18.3
 *               sunlight:
 *                 type: number
 *                 example: 300
 *               nitrogen_level:
 *                 type: number
 *                 example: 12.1
 *               phosphor:
 *                 type: number
 *                 example: 5.4
 *               potassium:
 *                 type: number
 *                 example: 8.7
 *     responses:
 *       200:
 *         description: Sensor data uppdaterad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sensor data updated for flower ID 123
 *       403:
 *         description: Obefogad sensor (fel API-nyckel)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized device
 *       404:
 *         description: Blomma hittades inte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Flower not found
 *       500:
 *         description: Server- eller databasfel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Database error message
 *                 details:
 *                   type: string
 *                   example: Additional error details
 */
router.put('/api/sensor/update/:flowerId', updateSensorData);

export default router;
