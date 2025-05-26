import express from 'express';
import dotenv from 'dotenv';
import authenticateToken from '../../middleware/auth.js';

import getPlants from './getPlants.js';
import addPlant from './addPlant.js';
import deletePlant from './deletePlant.js';
import updatePlant from './updatePlant.js';

dotenv.config();

const router = express.Router();

router.use(authenticateToken); // Alla plant-rutter kräver JWT

router.use(getPlants);
router.use(addPlant);
router.use(deletePlant);
router.use(updatePlant);

export default router;
