import supabase from '../../supabase/supabaseClient.js';

export const addPlant = async (req, res, next) => {
  const userId = req.params.userId;

  const flower = {
    user_id: userId,
    flower_name: req.body.flower_name,
    last_watered: req.body.last_watered,
    watering_interval: req.body.watering_interval,
    moisture: req.body.moisture,
    flower_temp: req.body.flower_temp,
    dirt_temp: req.body.dirt_temp,
    sunlight: req.body.sunlight,
    nitrogen_level: req.body.nitrogen_level,
    phosphor: req.body.phosphor,
    potassium: req.body.potassium,
  };

  if (!req.body.flower_name || req.body.flower_name.trim() === '') {
    return res.status(400).json({ error: 'Flower name is required' });
  }

  try {
    const { error } = await supabase.from('flowers').insert([flower]);

    if (error) {
      return next(new Error('Supabase query failed'));
    }

    res.status(200).json({ message: 'Flower added!' });
  } catch (error) {
    next(error);
  }
};
