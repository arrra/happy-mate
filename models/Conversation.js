'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  from_email: {type: String, required: true, unique: true},
  to_email: {type: String, required: true, unique: true},
  sent_messages: {type: Array}
})

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
