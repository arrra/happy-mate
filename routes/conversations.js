'use strict';

const Router = require('express').Router;
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Mail = require('../classes/Mail');

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
      return;
    }
    Conversation.findById(req.params.id, (err, conversation) => {
      if(err){
        res.status(404).json(err);
        return;
      }

      conversation.addNewMessage(message, (err) => {
        if(err){
          res.status(500).json(err);
        } else {
          res.status(200).json(conversation);
        }
      })
    })
  })
})

router.post('/:id/messages/send', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    let subject = "Important email";
    let mail = new Mail(
      conversation.to_email,
      conversation.from_email,
      subject,
      conversation.sent_messages[0].body,
      process.env.TEMPLATE_ID
    );

    mail.sendEmail((err, result) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(200).json(result)
      }
    })
  })
})

module.exports = router;
