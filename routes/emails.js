const Router = require('express').Router;
const Message = require('../models/Message');

const router = Router();

router.post('/', (req, res) => {
  const message = new Message(req.body);
  message.save((err, message) => {
    if (err) {
      res.status(400).json(err);
      return;
    }

    res.status(201).json(message);
  });
});

module.exports = router;
