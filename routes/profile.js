const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const albumController = require('../controllers/album_controller');
const photoController = require('../controllers/photo_controller');
const profileValidationRules = require('../validation/profile');
const photoValidationRules = require('../validation/photo');
const albumValidationRules = require('../validation/album');

/**
 * Get authenticated user's profile
 */
router.get('/', profileController.getProfile);

/**
 * Update authenticated user's profile
 */
router.put('/', profileValidationRules.updateRules, profileController.updateProfile);



//**************************** */   ALBUMS   //**************************** */
/**
 * Get authenticated user's albums
 */
router.get('/albums', albumController.getAlbums);

/**
 * Get authenticated user's album BY ID
 */
router.get('/albums/:albumId', albumController.getAlbumById);

/**
* Add album to user
*/
router.post('/albums', albumValidationRules.albumRules, albumController.addNewAlbum);

/**
* Update album of the user by id
*/
router.put('/albums/:albumId', albumValidationRules.updateAlbumRules, albumController.updateAlbum)

/**
* Add a photo to an album with photo_id in body request
*/
router.post('/albums/:albumId/photos', photoValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum);

/**
 * Remove photo from an album 
 */
router.delete('/albums/:albumId/photos/:photoId', albumController.removePhotoFromAlbum);

/**
 * Remove album and links to the photos
 */
router.delete('/albums/:albumId', albumController.removeAlbum);



//**************************** */   PHOTOS   //**************************** */
/**
* Add photo to user
*/
router.post('/photos', photoValidationRules.photoRules, photoController.addNewPhoto);

/**
 * Get authenticated user's photos
 */
router.get('/photos', photoController.getPhotos);

/**
 * Get authenticated user's photo by id
 */
router.get('/photos/:photoId', photoController.getPhotoById);

/**
* Update photo of the user
*/
router.put('/photos/:photoId', photoValidationRules.updatePhotoRules, photoController.updatePhoto)

/**
 * Remove photo and all its connections to album or albums
 */
router.delete('/photos/:photoId', photoController.removePhoto);


module.exports = router;