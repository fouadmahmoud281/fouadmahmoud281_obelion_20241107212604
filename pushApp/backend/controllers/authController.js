const { Router } = require('express');
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = Router();

// Environment variables (ensure these are set in your environment)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Email login
authController.post('/login/email', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Google login
authController.post('/login/google', async (req, res) => {
  // Placeholder for Google login implementation
  res.status(501).json({ error: 'Google login not implemented yet' });
});

// Facebook login
authController.post('/login/facebook', async (req, res) => {
  // Placeholder for Facebook login implementation
  res.status(501).json({ error: 'Facebook login not implemented yet' });
});

// Create new user
authController.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = authController;
