'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/messages';

mongoose.connect(uri, {useMongoClient: true});

module.exports = uri;
