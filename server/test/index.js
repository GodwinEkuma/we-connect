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

// Test for getting all business
describe('GET  /businesses?location=location&category=category', () => {
  it('it should get all businesses by location', (done) => {
    chai.request(app)
      .get('/v1/businesses?location=lekki')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the location', (done) => {
    chai.request(app)
      .get('/v1/businesses?location=abuja')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('it should get all businesses by category', (done) => {
    chai.request(app)
      .get('/v1/businesses?category=Web Development and Graphics')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the category', (done) => {
    chai.request(app)
      .get('/v1/businesses?category=qrwr')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('it should get all businesses by category and location', (done) => {
    chai.request(app)
      .get('/v1/businesses?category=Web Development and Graphics&location=surulere')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the category and location', (done) => {
    chai.request(app)
      .get('/v1/businesses?category=qrwr&location=shaga')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test for get reviews
describe('GET businesses/:id/reviews', () => {
  it('it should return all reviews for a business', (done) => {
    chai.request(app)
      .get('/v1/businesses/1/reviews')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no reviews are found for a business', (done) => {
    chai.request(app)
      .get('/v1/businesses/5/reviews')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
