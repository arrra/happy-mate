'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/happy-mate';



const setupAndConnect = (done) => {
  mongoose.connect(uri, {useMongoClient: true}, (err,done) => {
    if(err) return err;
    done;
  });
}

module.exports = {
  uri,
  setupAndConnect,
};
