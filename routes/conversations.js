'use strict';

const Router = require('express').Router;
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = Router();


router.post('/', (req, res) => {
  let conversation = new Conversation({
    from_email: req.body.from_email,
    to_email: req.body.to_email
  });

  conversation.save((err) => {
    if (err){
      res.status(400).json(err);
    } else {
      res.status(201).json(conversation);
    }
  });
})

router.put('/:id/messages', (req, res) => {
  Message.getRandomMessage((err, message) => {
    if(err){
      res.status(400).json(err);
    } else {
      Conversation.updateSentMessages(req.params.id, message, (err, conversation) => {
        if(err){
          res.status(400).json(err);
        } else {
          res.status(200).json(conversation);
        }
      })
    }
  })
})


module.exports = router;
