const mongoose = require('mongoose');
const util = require('../util');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  from_email: { type: String, required: true },
  to_email: { type: String, required: true },
  sent_messages: { type: Array },
  messagePool: { type: Array },
});

ConversationSchema.method({
  addNewMessage(message, cb) {
    this.sent_messages.unshift(message);
    this.save(cb);
  },

  getRandomMessage(cb) {
    const randomIndex = util.getRandomNumber(0, this.messagePool.length - 1);
    cb(null, this.messagePool[randomIndex]);
  },
});


const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
