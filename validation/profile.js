/**
 * Profile Validation Rules
 */

 const { body } = require('express-validator');
 
 const updateRules = [
     body('password').optional().isLength({ min: 4 }),
     body('email').isEmail().normalizeEmail(),
     body('first_name').optional().isLength({ min: 2 }),
     body('last_name').optional().isLength({ min: 2 }),
 ];
 
 module.exports = {
     updateRules,
 }