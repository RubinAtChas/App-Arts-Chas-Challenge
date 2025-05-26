import supabase from '../../supabase/supabaseClient.js';

export const deletePlant = async (req, res, next) => {
  const flowerId = req.params.flowerId;
  const userId = req.params.userId;

  try {
    const { data, error } = await supabase
      .from('flowers')
      .delete()
      .eq('flower_id', flowerId)
      .eq('user_id', userId)
      .select();

    if (error) {
      return next(new Error('Supabase query failed'));
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ error: `Could not find any plants with the ID: ${flowerId}` });
    }

    res
      .status(200)
      .json({ message: `Plant with ID ${flowerId} has been removed!` });
  } catch (error) {
    next(error);
  }
};
