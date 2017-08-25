const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../server');

chai.use(chaiHttp);

describe('Emails', ()=> {
  describe('/GET emails', ()=> {
    it('should GET all emails', (done)=> {
      chai.request(server)
        .get('/emails')
        .end((err, res) => {
          res.should.have.status(200);
        })
      done();
    })
  })

})
