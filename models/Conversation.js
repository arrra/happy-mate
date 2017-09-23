'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  from_email: {type: String, required: true, unique: true},
  to_email: {type: String, required: true, unique: true},
  sent_messages: {type: Array}
})

ConversationSchema.statics.updateSentMessages = function(id, message, cb) {
  return this.findById(id, function(err, conversation) {
    conversation.sent_messages.push(message);
    conversation.save();
    return cb(err, conversation);
  })
}
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
