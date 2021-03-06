const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app} = require('./setup.spec')

describe('GET /api/v1/', function() {
    it("Returns hello world with 200 ok response status code on success", (done) => {
      chai.request(app)
      .get('/api/v1/')
      .send()
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    })
  });

  