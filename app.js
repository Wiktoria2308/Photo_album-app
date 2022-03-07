const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const http = require('http');

// instantiate express
const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('./routes'));
const server = http.createServer(app);
server.listen(3000);

module.exports = app;