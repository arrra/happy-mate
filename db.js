'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/happy-mate';



const setupAndConnect = () => {
  mongoose.connect(uri, {useMongoClient: true});
}

module.exports = {
  uri,
  setupAndConnect,
};
