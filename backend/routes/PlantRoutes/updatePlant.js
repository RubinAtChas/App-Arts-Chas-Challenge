import express from "express";
import dotenv from "dotenv";
import { updatePlant } from "../../handlers/plants/updatePlantHandler.js";

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/{userId}/update-flower/{flowerId}:
 *   put:
 *     summary: Uppdatera en blommas namn
 *     tags:
 *       - Flowers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: flowerId
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Växt uppdaterad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Ogiltig begäran – växtnamn krävs
 *       404:
 *         description: Växt hittades inte
 */
router.put("/api/:userId/update-flower/:flowerId", updatePlant);

export default router;
