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

module.exports = router;
