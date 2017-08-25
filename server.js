'use strict';

const express = require('express');
const app = express();
const router = require('./routes/router')

router(app);

app.listen(3000, () => {
  console.log('listening on port 3000');
})

module.exports = app;
