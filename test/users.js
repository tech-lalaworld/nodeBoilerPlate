/* eslint-disable */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Node boilerplate Testing', () => {
  describe('Testing for welcome message', () => {
    it('it should GET a welcome message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('csrfToken');
          res.body.should.have.property('jwt');
          res.body.msg.should.eql('welcome to node boiler plate');
          done();
        });
    });
  });

  describe('Testing for get info route', () => {
    let jwtToken = '';
    let csrfToken = '';
    beforeEach(function(done) {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          let result = JSON.parse(res.text);
          jwtToken = result.jwt;
          csrfToken = result.csrfToken;
          done();
        });
    });

    it('it returns info of users', () => {
      chai.request(server)
        .get('/show')
        .set('Authorization', `Bearer ${jwtToken}`)
        .set('X-XCSRF-TOKEN', csrfToken)
        .type('json')
        .send('{"info": "test info"}')
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});