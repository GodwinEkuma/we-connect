import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

// Test for getting all business
describe('GET business', () => {
  it('it should get all businesses', (done) => {
    chai.request(app)
      .get('/v1/businesses')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

// Test for getting a particular business
describe('GET business/id', () => {
  it('it should return business by id', (done) => {
    chai.request(app)
      .get('/v1/businesses/4')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('businessName');
        expect(res.body).to.have.property('businessCategory');
        expect(res.body).to.have.property('businessAddress');
        done();
      });
  });
  it('it should return 404 if business is not found', (done) => {
    chai.request(app)
      .get('/v1/businesses/8')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
