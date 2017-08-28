'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes/router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
})

module.exports = app;
