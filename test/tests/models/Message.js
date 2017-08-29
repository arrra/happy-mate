'use strict';

const Message = require('../../../models/Message');

describe('Message model', () => {
  describe('creating Message', () => {
    let message;

    beforeEach(() => {
      message = new Message({ from_email: 'ssing128@gmail.com', to_email:'ssing128@gmail', body: 'i love you' });
    })

    it('should have from email', () => {
      message.should.have.property('from_email', message.from_email);
    }) 

    it('should have to email', () => {
      message.should.have.property('to_email', message.to_email);
    }) 

    it('should have body', () => {
      message.should.have.property('body');
    }) 

  })
})

