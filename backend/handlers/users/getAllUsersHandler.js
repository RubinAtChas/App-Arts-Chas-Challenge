import supabase from '../../supabase/supabaseClient.js';

export const getAllUsersHandler = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Something went wrong with the database request' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Something went wrong with the database request' });
  }
};
