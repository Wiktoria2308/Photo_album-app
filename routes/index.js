const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation/user');


router.use('/profile', auth.validateJwtToken, require('./profile'));
// login a user and get a JWT token
router.post('/login', authController.login);

// issue a new JWT access token
router.post('/refresh', authController.refresh);
// register a new user
router.post('/register', userValidationRules.createRules, authController.register);

module.exports = router;