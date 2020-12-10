"use strict";

var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(require("cors")()); // Routes

app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatRoom')); // Setup Error handlers

var errorHandlers = require('./handlers/errorHandler');

app.use(errorHandlers.mongooseError);
app.use(errorHandlers.notFound);

if (process.env.ENV == 'DEVELOPMENT') {
  app.use(errorHandlers.developmentError);
} else {
  app.use(errorHandlers.productionError);
}

module.exports = app;