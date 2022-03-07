/**
 * Authentication Middleware
 */

 const debug = require('debug')('books:auth');
 const { User } = require('../models');
 const jwt = require('jsonwebtoken');
 
 /**
 * Validate JWT token
 */
const validateJwtToken = (req, res, next) => {
	// make sure Authorization header exists, otherwise bail
	if (!req.headers.authorization) {
		debug("Authorization header missing");

		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	// Authorization: "Bearer eyJkpXVCJ9.eyJV9.xndmU"
	// split authorization header into "authSchema token"
	const [authSchema, token] = req.headers.authorization.split(' ');
	if (authSchema.toLowerCase() !== "bearer") {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	// verify token (and extract payload)
	try{
		req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed',
		});
	}

	// pass request along
	next();
}
 
 
 module.exports = {
    validateJwtToken,
 }
 