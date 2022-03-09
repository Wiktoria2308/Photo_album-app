/**
 * Profile Controller
 */
 const bcrypt = require("bcrypt");
 const debug = require("debug")("books:profile_controller");
 const { matchedData, validationResult } = require("express-validator");
 const models = require('../models');
 /**
  * Get authenticated user's profile
  *
  * GET /
  */
 const getProfile = async (req, res) => {
   try {
     res.send({
       status: "success",
       data: {
         user: req.user,
       },
     });
   } catch (error) {
     res.status(404).send({
       status: "error",
       message: "Profile not found.",
     });
   }
 };
 
 /**
  * Update authenticated user's profile
  *
  * PUT /profile
  */
 const updateProfile = async (req, res) => {
   // check for any validation errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(422).send({ status: "fail", data: errors.array() });
   }
   // get only the validated data from the request
   const validData = matchedData(req);
   // update the user's password, but only if they sent us a new password
   if (validData.password) {
     try {
       validData.password = await bcrypt.hash(validData.password, 10);
     } catch (error) {
       res.status(500).send({
         status: "error",
         message: "Exception thrown when hashing the password.",
       });
       throw error;
     }
   }
  
   try {
    //  const updatedUser = await req.user.save(validData);
    const updatedUser = await models.User.query({ where: { id: req.user.id }}).fetch({ require: false });
    updatedUser.save(validData);
     res.send({
       status: "success",
       data: {
         user: validData,
       },
     });
   } catch (error) {
     res.status(500).send({
       status: "error",
       message: "Exception thrown in database when updating a new user.",
     });
     throw error;
   }
 };
 
 module.exports = {
   getProfile,
   updateProfile,
 };
 