'use strict';

class Mail {
  constructor(fromEmail, toEmail, message){
    this.fromEmail = fromEmail;
    this.toEmail = toEmail;
    this.message = message;
  }
}

module.exports = Mail;
