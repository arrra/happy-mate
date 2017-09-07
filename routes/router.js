'use strict';

const emails = require('./emails');
const conversations = require('./conversations');

module.exports = function(app){
  app.use('/emails', emails)
  app.use('/conversations', conversations)
};
