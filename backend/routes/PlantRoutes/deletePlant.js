import express from 'express';
import dotenv from 'dotenv';
import { deletePlant } from '../../handlers/plants/deletePlantHandler.js';

dotenv.config();

const router = express.Router();

/**
 * @swagger
 * /api/{userId}/remove-flower/{flowerId}:
 *   delete:
 *     summary: Ta bort en växt
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
 *     responses:
 *       200:
 *         description: Växt borttagen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Växt hittades inte
 */
router.delete('/api/:userId/remove-flower/:flowerId', deletePlant);

export default router;
