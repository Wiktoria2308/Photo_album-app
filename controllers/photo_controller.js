/**
 * Album Controller
 */

 const debug = require('debug')('books:author_controller');
 const { matchedData, validationResult } = require("express-validator");
 const models = require('../models');
 
 
 /**
 * Get authenticated user's photos
 *  GET /photos
 */
 const getPhotos = async (req, res) => {
     try {
         const photo = await models.Photo.query({ where: { userId: req.user.id } })
             .fetchAll({ require: false })
 
         res.status(200).send({
             status: 'success',
             data: photo
         });
     } catch (error) {
         res.status(404).send({
             status: 'error',
             message: 'Photos not found.',
         });
         throw error;
     }
 }
 
 /**
  * Get photo by its given id
  * GET /photos/:photoId
  */
 const getPhotoById = async (req, res) => {
     try {
         const photoID = req.params.photoId;
         const photo = await new models.Photo({ id: photoID, userId: req.user.id }).fetch({ require: false });
         if (!photo) {
             res.status(404).send({
                 status: 'fail',
                 message: "User has not photo with id " + photoID + '.'
             });
         }
         else {
             res.status(200).send({
                 status: 'success',
                 data: photo
             });
         }
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database.',
         });
         throw error;
     }
 }
 /**
  * Add a new photo
  * POST /photos
  */
 const addNewPhoto = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
     const validData = matchedData(req);
     try {
         validData.userId = req.user.id;
         const photo = await new models.Photo(validData).save();
         res.status(200).send({
             status: 'success',
             data: {
                 photo,
             },
         });
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when adding an album to a user.',
         });
         throw error;
     }
 }
 
 /**
  * Update a photo
  * PUT /photos/:photoId
  */
 const updatePhoto = async (req, res) => {
     const photoID = req.params.photoId;
     const photo = await new models.Photo({ id: photoID }).fetch({ require: false });
     if (!photo) {
         res.status(404).send({
             status: 'fail',
             data: 'Photo Not Found',
         });
         return;
     }
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
     const validData = matchedData(req);
 
     try {
         const updatedPhoto = await photo.save(validData);
         res.send({
             status: 'success',
             data: {
                 updatedPhoto,
             },
         });
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new book.',
         });
         throw error;
     }
 }
 
 /**
  * Remove photo and all its connections to an album
  * DELETE /photos/:photoId
  */
 const removePhoto = async (req, res) => {
     const photoId = req.params.photoId;
     const photo = await new models.Photo({ id: photoId, userId: req.user.id }).fetch({ withRelated: ['albums'] });
     if (!photo) {
         res.status(404).send({
             status: 'fail',
             data: 'Photo Not Found',
         });
         return;
     }
     try {
         photo.albums().detach();
         photo.destroy();
         res.status(200).send({
             status: 'success',
             data: null
         });
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database.',
         });
         throw error;
     }
 }
 
 
 module.exports = {
     addNewPhoto,
     getPhotos,
     updatePhoto,
     getPhotoById,
     removePhoto
 };