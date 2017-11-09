require('dotenv').config();

if (typeof process.env.MONGO_HOST === 'undefined') {
  if (process.argv[2] === 'docker') {
    process.env.MONGO_HOST = 'mongo';
  } else {
    process.env.MONGO_HOST = 'localhost';
  }
}

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

router.attachRoutes(app);

app.use((req, res) => {
  res.status(404).json({ error: `no route matching ${req.method} ${req.path}` });
});

db.setupAndConnect((err) => {
  if (err) {
    throw new Error(`server unable to connect to DB: ${err}`);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
});


module.exports = app;
