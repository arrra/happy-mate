'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('../util/index');

const MessageSchema = new Schema({
  body: {type: String, required: true},
})

MessageSchema.statics.getRandomMessage = function(cb) {
  return this.find({},function(err, messages) {
    cb(err, messages[util.getRandomNumber(0, messages.length)])
  });
}

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
