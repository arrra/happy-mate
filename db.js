'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/happy-mate';

mongoose.connect(uri, {useMongoClient: true});

module.exports = {
  uri,
};
