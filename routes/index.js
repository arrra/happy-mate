const emails = require('./emails');
const conversations = require('./conversations');
const users = require('./users');
const authenticate = require('./authenticate');
const jwt = require('jsonwebtoken');

const isAuthunicated = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(498).json({ error: 'unable to authenticate token' });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.status(499).json({ error: 'no token provided' });
  }
};

const attachRoutes = (app) => {
  app.use('/emails', isAuthunicated, emails);
  app.use('/conversations', isAuthunicated, conversations);
  app.use('/users', users);
  app.use('/authenticate', authenticate);
};

module.exports = {
  attachRoutes,
};

