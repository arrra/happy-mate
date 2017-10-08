const Router = require('express').Router;
const Conversation = require('../models/Conversation');

const router = Router();

router.put('/:id', (req, res) => {
  Conversation.findByIdAndUpdate(req.params.id, {emailVerified: true}, { new: true }, (err, conversation) => {
    if(err){
      res.status(500).json(err);
      return;
    }
    res.status(200).json(conversation);
  });
});

module.exports = router;
