import supabase from '../../supabase/supabaseClient.js';
import dotenv from 'dotenv';

dotenv.config();

export const updateSensorData = async (req, res, next) => {
  const flowerId = req.params.flowerId;
  const apiKey = req.headers['x-api-key']; // API-nyckel

  if (!apiKey || apiKey !== process.env.SENSOR_API_KEY) {
    return res.status(403).json({ error: 'Unauthorized device' });
  }

  const {
    moisture,
    flower_temp,
    dirt_temp,
    sunlight,
    nitrogen_level,
    phosphor,
    potassium,
  } = req.body;

  try {
    const { data, error } = await supabase
      .from('flowers')
      .update({
        moisture,
        flower_temp,
        dirt_temp,
        sunlight,
        nitrogen_level,
        phosphor,
        potassium,
      })
      .eq('flower_id', flowerId)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res
        .status(500)
        .json({ error: error.message, details: error.details });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    res
      .status(200)
      .json({ message: `Sensor data updated for flower ID ${flowerId}` });
  } catch (error) {
    next(error);
  }
};
