'use strict';

describe('/POST emails', ()=> {
  it('should save message to DB', (done)=> {
    let message = {from_email: 'ssing128@gmail', to_email: 'ssing128@gmail', body: 'i love you'};
    request
      .post('/emails')
      .send(message)
      .expect(200)
      .end((err,res)=> {
        if(err) return done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('body', message.body);
        res.body.should.have.property('id');
      })
    done();
  })
})

