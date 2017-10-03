const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  from_email: { type: String, required: true },
  to_email: { type: String, required: true },
  sent_messages: { type: Array },
});

ConversationSchema.method({
  addNewMessage(message, cb) {
    this.sent_messages.unshift(message);
    this.save(cb);
  },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
