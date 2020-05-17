const express = require('express');
const ventilators = require('../routes/ventilators');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/ventilators', ventilators);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
   app.use(error);
}