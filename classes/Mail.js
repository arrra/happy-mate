const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Mail {
  constructor(toEmail, fromEmail, subject, html, templateId) {
    const _toEmail = toEmail;
    const _fromEmail = fromEmail;
    const _subject = subject;
    const _html = html;
    const _templateId = templateId;

    this.sendEmail = function (cb) {
      const sgMsg = {
        to: _toEmail,
        from: _fromEmail,
        subject: _subject,
        html: _html,
        templateId: _templateId,
      };
      sgMail.send(sgMsg, cb);
    };
  }
}

module.exports = Mail;
