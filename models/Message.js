'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {type: String, required: true},
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
