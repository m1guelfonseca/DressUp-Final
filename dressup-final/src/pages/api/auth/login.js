import { compare } from 'bcrypt';
import User from '../../../lib/models/user.js';

import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password } = req.body;
  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Forneça um e-mail e senha' });
  }
  // Retrieve user from the database
  try {
    const user = await User.findByEmail(email);
    // Check if user exists and password is correct
    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ message: 'E-mail ou senha inválida' });
    }
    // Create session for the user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({token});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no login...' });
  }
}