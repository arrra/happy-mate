'use strict';

const Mail = require('../../lib/mail');

describe('Mail', ()=> {
  describe('Mail properties', ()=> {
    let mail;

    beforeEach(() => {
      mail = new Mail('from@gmail.com', 'to@gmail.com', 'i love you');
    })

    it('should set fromEmail', ()=> {
      expect(mail.fromEmail).to.equal('from@gmail.com');
    })

    it('should set toEmail', ()=> {
      expect(mail.toEmail).to.equal('to@gmail.com');
    })

    it('should set message', ()=> {
      expect(mail.message).to.equal('i love you');
    })

    it('should create mail instances', ()=> {
      expect(mail).to.be.instanceOf(Mail);
    })

  })
})
