const mongoose = require('mongoose');

const host = process.env.MONGO_HOST;
const uri = `mongodb://${host}/happy-mate`;

const setupAndConnect = (done) => {
  mongoose.connect(uri, { useMongoClient: true }, done);
};

module.exports = {
  uri,
  setupAndConnect,
};
