const emails = require('./emails');
const conversations = require('./conversations');
const users = require('./users');

const attachRoutes = (app) => {
  app.use('/emails', emails);
  app.use('/conversations', conversations);
  app.use('/users', users);
};

module.exports = {
  attachRoutes,
};

