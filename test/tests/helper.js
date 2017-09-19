'use strict';

const app = require('../../server');
const chai = require('chai');
const db = require('../../db');
const mongoose = require('mongoose');
const clearDB  = require('mocha-mongoose')(db.uri);
const request = require('supertest');

chai.use(require('chai-as-promised'));
global.expect = chai.expect();
global.should = chai.should();
global.request = request(app);



beforeEach((done, err) => {
  if(mongoose.connection.db) return done(err);

  mongoose.connect(db.uri, (err) => {
    if(err) return err;
    done();
  });
  clearDB((err) => {
    if(err) return err;
    done();
  });
});

afterEach((done) => {
  mongoose.disconnect();
  done();
});
