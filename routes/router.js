'use strict';

const emails = require('./emails');

module.exports = function(app){
  app.use('/emails', emails)
};
