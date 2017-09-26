'use strict';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Mail {
  constructor(toEmail, fromEmail, subject,  html, templateId){
    let _toEmail = toEmail;
    let _fromEmail = fromEmail;
    let _subject = subject;
    let _html = html;
    let _templateId = templateId;

    this.sendEmail = function(cb) {
      const sgMsg = {
        to: _toEmail,
        from: _fromEmail,
        subject: _subject,
        html: _html,
        templateId: _templateId
      }
      sgMail.send(sgMsg,cb);
    }
  }
}

module.exports = Mail;
