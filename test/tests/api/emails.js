'use strict';

describe('/POST emails', ()=> {
  it('should save message to DB', (done)=> {
    let message = { body: 'i love you'};
    request
      .post('/emails')
      .send(message)
      .expect(201)
      .end((err,res)=> {
        if(err) return done(err);
        res.body.should.be.a('object');
        res.body.should.have.property('body', message.body);
        res.body.should.have.property('_id');
        done();
      })
  })
})

