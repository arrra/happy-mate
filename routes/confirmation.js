const Router = require('express').Router;
const Conversation = require('../models/Conversation');
const Mail = require('../classes/Mail');

const router = Router();

router.get('/:id', (req, res) => {
  Conversation.findByIdAndUpdate(req.params.id, {emailVerified: true}, { new: true }, (err, conversation) => {
    if(err){
      res.status(500).json(err);
      return;
    }
    res.status(200).json(conversation);
  });
});

router.put('/:id/send-confirmation', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    const subject = 'Verify your email';
    const from = 'ssing128@gmail.com';
    const body = 'http://localhost:8080/#/confirmation/'+conversation._id;
    const mail = new Mail(
      conversation.to_email,
      from,
      subject,
      body,
      process.env.CONFIRMATION_EMAIL_TEMPLATE_ID,
    );

    mail.sendEmail((err) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).end();
    });
  });
});

module.exports = router;
