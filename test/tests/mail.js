'use strict';

const Mail = require('../../lib/mail');

describe('Mail', ()=> {
  describe('Mail properties', ()=> {
    let mail;

    beforeEach((done) => {
      mail = new Mail('ssing128@gmail.com', 'ssing128@gmail.com', 'i love you');
      mail.send(()=> {
        console.log('__calling done')
        done();
      })
    })

    it('should set fromEmail', ()=> {
      expect(mail.fromEmail).to.equal('ssing128@gmail.com');
      console.log('__inside it block')
    })

    it('should set toEmail', ()=> {
      expect(mail.toEmail).to.equal('ssing128@gmail.com');
    })

    it('should set message', ()=> {
      expect(mail.message).to.equal('i love you');
    })

    it('should create mail instances', ()=> {
      expect(mail).to.be.instanceOf(Mail);
    })

  })
})
