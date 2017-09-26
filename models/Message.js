const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const util = require('../util');

const MessageSchema = new Schema({
  body: { type: String, required: true },
});

MessageSchema.statics.getRandomMessage = function (cb) {
  return this.find({}, (err, messages) => {
    const randomIndex = util.getRandomNumber(0, messages.length);
    cb(err, messages[randomIndex]);
  });
};

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
