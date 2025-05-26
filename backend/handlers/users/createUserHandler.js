import bcrypt from 'bcryptjs';
import supabase from '../../supabase/supabaseClient.js';

export const createUserHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }]);

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Something went wrong with the database request' });
    }

    res.status(200).json({
      message: `Added name: ${name} and email/password to the database`,
    });
  } catch (error) {
    next(error);
  }
};
