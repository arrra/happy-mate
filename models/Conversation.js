const mongoose = require('mongoose');
const util = require('../util');
const Mail = require('../classes/Mail');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;
const serviceEmail = 'ssing128@gmail.com';

const ConversationSchema = new Schema({
  from_email: { type: String, required: true },
  to_email: { type: String, required: true },
  sent_messages: { type: Array },
  messagePool: { type: Array },
  verifyToken: { type: String },
});

ConversationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const conversation = ret;
    delete conversation.verifyToken;
    return conversation;
  },
});

ConversationSchema.virtual('isVerified').get(function () {
  return this.verifyToken === '';
});

ConversationSchema.method({
  addNewMessage(message, callback) {
    let cb = callback;
    if (!(cb instanceof Function)) {
      cb = () => {};
    }

    const sentMessages = this.sent_messages.slice();
    sentMessages.push(message);

    this.constructor.findByIdAndUpdate(
      this._id,
      { sent_messages: sentMessages },
      { new: true },
      cb,
    );
  },

  sendRandomMessage(callback) {
    let cb = callback;
    if (!(cb instanceof Function)) {
      cb = () => {};
    }

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

  getRandomMessage(callback) {
    let cb = callback;
    if (!(cb instanceof Function)) {
      cb = () => {};
    }

    const randomIndex = util.getRandomNumber(0, this.messagePool.length - 1);
    cb(null, this.messagePool[randomIndex]);
  },

  sendRandomMessageEvery(interval) {
    setInterval(() => {
      this.sendRandomMessage();
    }, interval);
  },

  generateToken() {
    return uuidv4();
  },

  sendVerificationEmail(callback) {
    let cb = callback;
    if (!(cb instanceof Function)) {
      cb = () => {};
    }

    const subject = 'Verify your email';
    const body = `http://localhost:8080/#/conversations/${this._id}/verify?token=${this.verifyToken}`;
    const mail = new Mail(
      this.to_email,
      serviceEmail,
      subject,
      body,
      process.env.CONFIRMATION_EMAIL_TEMPLATE_ID,
    );

    mail.sendEmail(cb);
  },

  verifyTokenEmail(queryToken, callback) {
    let cb = callback;
    if (!(cb instanceof Function)) {
      cb = () => {};
    }

    if (this.verifyToken === queryToken) {
      this.verifyToken = '';
      this.save((err) => {
        cb(err, this);
      });
    } else {
      const err = new Error('Verification token does not match.');
      cb(err, null);
    }
  },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
