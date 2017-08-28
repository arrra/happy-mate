'use strict';

const Message = require('../../../models/Message');
const expect = require('chai').expect;

describe('Message model', () => {
  describe('creating Message', () => {
    let message;

    beforeEach(() => {
      message = new Message({ email: 'ssing128@gmail.com', body: 'i love you' });
    })

    it('should have email', () => {
      message.should.have.property('email', message.email);
    }) 

    it('should have body', () => {
      message.should.have.property('body');
    }) 

  })
})

