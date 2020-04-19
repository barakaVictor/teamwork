const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {app} = require('./setup.spec')

describe('GET /api/v1/feed', function() {
    it("Returns hello world with 200 ok with a list of posts or gifs", (done) => {
      chai.request(app)
      .get('/api/v1/feed')
      .send()
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
    })
  });

  