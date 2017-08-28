'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  email: {type: String, required: true},
  body: {type: String, required: true}
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
