import supabase from '../../supabase/supabaseClient.js';

export const updatePlant = async (req, res, next) => {
  const flowerId = req.params.flowerId;
  const userId = req.params.userId;

  if (!req.body.flower_name || req.body.flower_name.trim() === '') {
    return res.status(400).json({ error: 'Flower name is required' });
  }

  try {
    const { data, error } = await supabase
      .from('flowers')
      .update({ flower_name: req.body.flower_name })
      .eq('flower_id', flowerId)
      .eq('user_id', userId)
      .select();

    if (error) {
      return next(new Error('Supabase query failed'));
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    res
      .status(200)
      .json({ message: `Flower with ID ${flowerId} has been updated!` });
  } catch (error) {
    next(error);
  }
};
