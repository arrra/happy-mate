'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/happy-mate';

const setupAndConnect = (done) => {
  mongoose.connect(uri, {useMongoClient: true}, done);
};

module.exports = {
  uri,
  setupAndConnect,
};
