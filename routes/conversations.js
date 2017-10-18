const Router = require('express').Router;
const Conversation = require('../models/Conversation');

const router = Router();

router.put('/:id', (req, res) => {
  Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, conversation) => {
    if (err || !conversation) {
      res.status(404).json(err);
      return;
    }

    res.status(200).json(conversation);
  });
});

router.get('/:id', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err || !conversation) {
      res.status(404).json(err);
      return;
    }

    if (conversation.owner.toString() !== req.decoded.id) {
      res.status(401).json(err);
      return;
    }
    res.status(200).json(conversation);
  });
});

router.get('/', (req, res) => {
  Conversation.findOne(req.query, (err, conversation) => {
    if (err) {
      res.status(500).json(err);
    } else if (conversation === null) {
      res.status(404).end();
    } else {
      res.status(200).json(conversation);
    }
  });
});

router.post('/', (req, res) => {
  const conversation = new Conversation({
    from_email: req.body.from_email,
    to_email: req.body.to_email,
    owner: req.decoded.id,
  });
  conversation.verifyToken = conversation.generateToken();

  conversation.save((err) => {
    if (err) {
      res.status(400).json(err);
    }
    conversation.sendVerificationEmail();
    res.status(201).json(conversation);
  });
});

router.put('/:id/send-random-message', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (!conversation.isVerified) {
      res.status(400).json({ error: 'User is not verified' });
      return;
    }

    conversation.sendRandomMessage((err, conversation) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(conversation);
      }
    });
  });
});

router.put('/:id/send-random-message-every', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err) {
      res.status(404).json(err);
      return;
    }

    if (!conversation.isVerified) {
      res.status(400).json({ error: 'User is not verified' });
      return;
    }

    conversation.sendRandomMessageEvery(req.query.interval);
    res.status(200).end();
  });
});

router.put('/:id/verify', (req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
    conversation.verifyTokenEmail(req.query.token, (err) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(200).end();
    });
  });
});
module.exports = router;
