const mongoose = require('mongoose');
const util = require('../util');
const Mail = require('../classes/Mail');

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

  sendRandomMessage(cb) {
    this.getRandomMessage((err, message) => {
      if (err) {
        cb(err);
        return;
      }

      const subject = 'Important email';
      const mail = new Mail(
        this.to_email,
        this.from_email,
        subject,
        message.body,
        process.env.TEMPLATE_ID,
      );

      mail.sendEmail((err) => {
        if (err) {
          cb(err);
          return;
        }

        this.addNewMessage(message, (err) => {
          cb(err, this);
        });
      });
    });
  },

  getRandomMessage(cb) {
    const randomIndex = util.getRandomNumber(0, this.messagePool.length - 1);
    cb(null, this.messagePool[randomIndex]);
  },

  sendRandomMessageEvery(interval) {
    setInterval(() => {
      this.sendRandomMessage();
    }, interval);
  },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
