/**
 * Album Validation Rules
 */
 const { body } = require('express-validator');

const albumRules = [
    body('title').exists().isLength({ min: 3 }),
    ];

const updateAlbumRules = [
    body('title').optional().isLength({ min: 3 }),
]

module.exports = {
    albumRules,
    updateAlbumRules
}