const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo');


//**************************** */   PHOTOS   //**************************** */
/**
* Add photo to user
*/
router.post('/', photoValidationRules.photoRules, photoController.addNewPhoto);

/**
 * Get authenticated user's photos
 */
router.get('/', photoController.getPhotos);

/**
 * Get authenticated user's photo by id
 */
router.get('/:photoId', photoController.getPhotoById);

/**
* Update photo of the user
*/
router.put('/:photoId', photoValidationRules.updatePhotoRules, photoController.updatePhoto)

/**
 * Remove photo and all its connections to album or albums
 */
router.delete('/:photoId', photoController.removePhoto);

module.exports = router;