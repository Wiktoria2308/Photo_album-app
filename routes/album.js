const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');
const photoValidationRules = require('../validation/photo');

//**************************** */   ALBUMS   //**************************** */
/**
 * Get authenticated user's albums
 */
 router.get('/', albumController.getAlbums);

 /**
  * Get authenticated user's album BY ID
  */
 router.get('/:albumId', albumController.getAlbumById);
 
 /**
 * Add album to user
 */
 router.post('/', albumValidationRules.albumRules, albumController.addNewAlbum);
 
 /**
 * Update album of the user by id
 */
 router.put('/:albumId', albumValidationRules.updateAlbumRules, albumController.updateAlbum)
 
 /**
 * Add a photo to an album with photo_id in body request
 */
 router.post('/:albumId/photos', photoValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum);
 
 /**
  * Remove photo from an album 
  */
 router.delete('/:albumId/photos/:photoId', albumController.removePhotoFromAlbum);
 
 /**
  * Remove album and links to the photos
  */
 router.delete('/:albumId', albumController.removeAlbum);

 
 module.exports = router;