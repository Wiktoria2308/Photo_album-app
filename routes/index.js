const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation/user');

// login a user and get a JWT token
router.post('/login', authController.login);

// issue a new JWT access token
router.post('/refresh', authController.refresh);
// register a new user
router.post('/register', userValidationRules.createRules, authController.register);

// router.use(auth.validateToken);
router.use('/profile', auth.validateToken, require('./profile'));

module.exports = router;