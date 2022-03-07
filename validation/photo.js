/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');

 const photoRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isURL(),
    body('comment').optional().isLength({ min: 3 }),
]

const updatePhotoRules = [
    body('title').optional().isLength({ min: 3 }),
    body('url').optional().isURL(),
    body('comment').optional().isLength({ min: 3 }),
]
const addPhotoToAlbumRules = [
    body('photo_id').exists().isInt() || body('photo_id').exists().isArray({ min: 1 })
]

module.exports = {
    photoRules,
    updatePhotoRules,
    addPhotoToAlbumRules
}