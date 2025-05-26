import supabase from '../../supabase/supabaseClient.js';

export const getPlants = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const { data, error } = await supabase
      .from('flowers')
      .select(
        `
        flower_id,
        flower_name,
        last_watered,
        watering_interval,
        moisture,
        flower_temp,
        dirt_temp,
        sunlight,
        nitrogen_level,
        phosphor,
        potassium,
        users:user_id (
          user_id,
          name
        )
      `
      )
      .eq('user_id', userId);

    if (error) {
      return next(new Error('Supabase query failed'));
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Could not find any plants' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
