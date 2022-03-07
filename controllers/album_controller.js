/**
 * Album Controller
 */

 const debug = require('debug')('books:author_controller');
 const { matchedData, validationResult } = require("express-validator");
 const models = require('../models');
 
 /**
 * Get authenticated user's albums
 *
 * GET profile/albums
 */
 const getAlbums = async (req, res) => {
     try {
         const album = await models.Album.query({ where: { userId: req.user.id } })
             .fetchAll({ require: false })
         res.status(200).send({
             status: 'success',
             data: {
                 album
             },
         });
     } catch (error) {
         res.status(404).send({
             status: 'error',
             message: 'Albums not found.',
         });
         throw error;
     }
 }
 
 /**
  * Get authenticated user's album by id
  *
  * GET profile/albums/:albumId
  */
 const getAlbumById = async (req, res) => {
     try {
         const albumID = req.params.albumId;
         // forge instead of new 
         const album = await models.Album.forge({ id: albumID, userId: req.user.id }).fetch({ withRelated: ['photos'] });
         if (!album) {
             res.status(404).send({
                 status: 'fail',
                 message: "User has not album with id " + albumID + '.'
             });
         }
         else {
             res.status(200).send({
                 status: 'success',
                 data: album
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
  * Add a new album to the authenticated user
  *
  * POST /albums
  * 
  */
 const addNewAlbum = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
     const validData = matchedData(req);
 
     try {
         validData.userId = req.user.id;
         const album = await new models.Album(validData).save();
 
         res.status(200).send({
             status: 'success',
             data: {
                 album,
             },
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database.',
         });
         throw error;
     }
 }
 
 /**
  * Update an album by ID
  *
  * PUT /:albumId
  */
 const updateAlbum = async (req, res) => {
     const albumID = req.params.albumId;
     const album = await new models.Album({ id: albumID }).fetch({ require: false });
     if (!album) {
         res.status(404).send({
             status: 'fail',
             data: 'Album Not Found',
         });
         return;
     }
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
     const validData = matchedData(req);
     try {
         const updatedAlbum = await album.save(validData);
         res.status(200).send({
             status: 'success',
             data: {
                 updatedAlbum,
             },
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database.',
         });
         throw error;
     }
 }
 
 /**
  * Add photo to an album
  * Or 
  * add multiply photos to an album
  *
  */
 const addPhotoToAlbum = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
     const validData = matchedData(req);
     const albumID = req.params.albumId;
     const album = await new models.Album({ id: albumID, userId: req.user.id }).fetch({ require: false });
     if (!album) {
         res.status(404).send({
             status: 'fail',
             data: 'Album Not Found',
         });
         return;
     }
     // check if multiply photos 
     if (Array.isArray(validData.photo_id)) {
         let photoID;
         let photo;
         let howMany = 0;
         for (let i = 0; i < validData.photo_id.length; i++) {
             photoID = validData.photo_id[i];
             photo = await new models.Photo({ id: photoID, userId: req.user.id }).fetch({ require: false });
             if (!photo) {
                 continue;
             }
             else {
                 try {
                     album.photos().attach(photoID);
                     howMany++;
                 } catch (error) {
                     res.status(500).send({
                         status: 'error',
                         message: 'Exception thrown in database.',
                     });
                     throw error;
                 }
             }
         }
         if (howMany > 0) {
             res.status(404).send({
                 status: 'success',
                 data: null
             });
         }
         else {
             res.status(404).send({
                 status: 'fail',
                 data: 'Photos Not Found',
             });
             return;
         }
     }
     // if one photo do this 
     else {
         const photoID = validData.photo_id;
         const photo = await new models.Photo({ id: photoID, userId: req.user.id }).fetch({ require: false });
         if (!photo) {
             res.status(404).send({
                 status: 'fail',
                 data: 'Photo Not Found',
             });
             return;
         }
         try {
             album.photos().attach(photoID);
             res.status(200).send({
                 status: 'success',
                 data: photo
             });
         }
 
         catch (error) {
             res.status(500).send({
                 status: 'error',
                 message: 'Exception thrown in database.',
             });
             throw error;
         }
     }
 }
 
 /**
  * Remove photo from album
  *
  */
 const removePhotoFromAlbum = async (req, res) => {
     const albumId = req.params.albumId;
     const photoId = req.params.photoId;
     const album = await new models.Album({ id: albumId, userId: req.user.id }).fetch({ withRelated: ['photos'] });
     if (!album) {
         res.status(404).send({
             status: 'fail',
             data: 'Album Not Found',
         });
         return;
     }
     try {
         const photos = album.related('photos');
         const findPhoto = photos.find(photos => photos.id == photoId);
         if (!findPhoto) {
             res.status(404).send({
                 status: 'fail',
                 data: 'Photo Not Found',
             });
             return;
         }
         album.photos().detach(photoId);
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
 
 /**
  * Remove album and all its photo connections
  *
  */
 const removeAlbum = async (req, res) => {
     const albumId = req.params.albumId;
     const album = await new models.Album({ id: albumId, userId: req.user.id }).fetch({ withRelated: ['photos'] });
     if (!album) {
         res.status(404).send({
             status: 'fail',
             data: 'Album Not Found',
         });
         return;
     }
     try {
         album.photos().detach();
         album.destroy();
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
     addNewAlbum,
     getAlbums,
     updateAlbum,
     getAlbumById,
     addPhotoToAlbum,
     removePhotoFromAlbum,
     removeAlbum
 };