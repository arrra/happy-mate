'use strict';

const Router = require('express').Router;
const Message = require('../models/Message');

const router = Router();

router.post('/', (req, res) => {
  let message = new Message(req.body);
  message.save(req.body, (err, message) => {
    if (err) return err;
    res.status(200).end();
  })
})

module.exports = router;
