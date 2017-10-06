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
    const sentMessages = this.sent_messages.slice();
    sentMessages.push(message);

    this.constructor.findByIdAndUpdate(
      this._id,
      { sent_messages: sentMessages },
      { new: true },
      cb,
    );
  },

  sendRandomMessage() {
    console.log('TODO sendRandomMessage');
  },

  getRandomMessage(cb) {
    const randomIndex = util.getRandomNumber(0, this.messagePool.length - 1);
    cb(null, this.messagePool[randomIndex]);
  },

  sendRandomMessageEvery(interval) {
    setInterval(() => {
      this.sendRandomMessage();
    }, interval)

  },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
