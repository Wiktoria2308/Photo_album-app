const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation/user');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Hello, you!' }});
});

router.use('/profile', auth.validateToken, require('./profile'));
router.use('/albums', auth.validateToken, require('./album'));
router.use('/photos', auth.validateToken, require('./photo'));

// login a user and get a JWT token
router.post('/login', authController.login);

// issue a new JWT access token
router.post('/refresh', authController.refresh);
// register a new user
router.post('/register', userValidationRules.createRules, authController.register);

module.exports = router;