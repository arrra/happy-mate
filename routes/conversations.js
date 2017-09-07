'use strict';

const Router = require('express').Router;
const Conversation = require('../models/Conversation');

const router = Router();

router.post('/', (req, res) => {

  let conversation = new Conversation({
    from_email: req.body.from_email,
    to_email: req.body.to_email
  });

  conversation.save((err) => {
    if (err) return res.status(500).json({error: err});
    return res.status(201).json(conversation);
  });

})

module.exports = router;
