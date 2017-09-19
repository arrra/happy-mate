'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes/router')

db.setupAndConnect((err) => {
  if (err) return err;
});

router(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
})

module.exports = app;
