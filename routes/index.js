'use strict';

const emails = require('./emails');
const conversations = require('./conversations');

const attachRoutes = (app) => {
  app.use('/emails', emails)
  app.use('/conversations', conversations)
}

module.exports = {
  attachRoutes
}

