'use strict';

const app = require('../../server');
const chai = require('chai');
const db = require('../../db');
const mongoose = require('mongoose');
const dbURI ='mongodb://localhost/message';
const clearDB  = require('mocha-mongoose')(dbURI);

chai.use(require('chai-as-promised'));

beforeEach((done, err) => {
  if(mongoose.connection.db) return done(err);

  mongoose.connect(dbURI);
  clearDB((err) => {
    if(err) return err;
    done();
  });
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});
