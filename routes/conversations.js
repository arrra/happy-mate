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
    if (err.code === 11000){
      let url = '/conversations/'+conversation.from_email+'/messages/send';
      return res.redirect(301,url);
    }
    if (err){
      return res.status(500).json({error: err});
    }
    return res.status(201).json(conversation);
  });

})

router.get('/:email/messages/send', (req, res) => {
  let messageToSend;

  Conversation.find(req.params.from_email, (err, conversation) => {

    Message.find({}, (err, messages) => {
      let messageToSend = generateMessage(messages, randomIndex(messages.length, 0));
      Conversation.update({_id: conversation[0]._id}, {$push: {sent_messages: messageToSend}}).exec();
			const msg = {
				to: conversation[0].to_email,
				from: conversation[0].from_email,
				subject: 'Sending with SendGrid is Fun',
				text: messageToSend.body,
				html: messageToSend.body,
        templateId: 'dd8b2676-2c59-4122-a26f-a119d99a2af8'
			};
			sgMail.send(msg);
    })
  })
})

const randomIndex = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateMessage = (messages, fn) => {
  return messages[fn]
}


module.exports = router;
