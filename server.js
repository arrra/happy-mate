require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if(req.method === 'OPTIONS'){
    console.log(req.method)
    res.status(200).end();
  }
  next();
});

router.attachRoutes(app);

app.use((req, res) => {
    res.status(404).end();
})

db.setupAndConnect((err) => {
  if (err) {
    throw new Error(`server unable to connect to DB: ${err}`);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
});


module.exports = app;
