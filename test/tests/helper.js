const chai = require('chai');
const db = require('../../db');
const mongoose = require('mongoose');
const clearDB = require('mocha-mongoose')(db.uri);

chai.use(require('chai-as-promised'));

global.should = chai.should();

beforeEach((done) => {
  if (mongoose.connection.db) return done();

  mongoose.connect(db.uri, (err) => {
    if (err) return done(err);
    clearDB(done);
  });
});

afterEach((done) => {
  mongoose.disconnect(done);
});
