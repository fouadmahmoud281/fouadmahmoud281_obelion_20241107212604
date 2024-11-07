const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login/email', authController.post.bind(authController, '/login/email'));
router.post('/login/google', authController.post.bind(authController, '/login/google'));
router.post('/login/facebook', authController.post.bind(authController, '/login/facebook'));
router.post('/signup', authController.post.bind(authController, '/signup'));

module.exports = router;
