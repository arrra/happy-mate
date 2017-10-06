const emails = require('./emails');
const conversations = require('./conversations');
const confirmation = require('./confirmation');

const attachRoutes = (app) => {
  app.use('/emails', emails);
  app.use('/conversations', conversations);
  app.use('/confirmation', confirmation);
};

module.exports = {
  attachRoutes,
};

