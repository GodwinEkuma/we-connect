import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';


const { expect } = chai;

chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTUyMjAzNzg0MjMzMiwiZXhwIjoxNTI0NjI5ODQyMzMyfQ.rOrcaIwrRXL3N-cNtKjSs7vbfIwJsBEYCJvGtRRDaT8';


// Test for post auth/signup
describe('POST auth/signup', () => {
  it('it should not post a signup  without email, password, business name, category and name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it should post a signup with email, password, business, firstname and lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'godwinamara@gmail.com',
        password: 'godwin1234',
        firstName: 'Godwin',
        lastName: 'Ekuma'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('data').a('object');
        done();
      });
  });
});

// Test for post auth/signin
describe('POST auth/signin', () => {
  it('it should not  signin  without email and password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it should sigin a user with email and password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'godwinamara@gmail.com',
        password: 'godwin1234',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        done();
      });
  });
});

// Test for post business
describe('POST businesses', () => {
  it('it should not post a business without name category and address', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        id: 1,
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessLogo: '../../template/images/user2.png',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it should post a business with name category and address', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        businessName: 'Instrap Solutions Limited',
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessCategory: 'Web Development and Graphics',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessAddress: '15 Abayomi Street, Surulere, Lagos.',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        expect(res.body).to.have.property('data').a('object');
        done();
      });
  });
  it('it should post a business with name category and address', (done) => {
    chai.request(app)
      .post('/api/v1/businesses')
      .set('x-access-token', token)
      .send({
        businessName: 'InfoMall Nigeria Limited',
        businessPhone: '0133512053',
        businessEmail: 'info@infomall.com',
        businessCategory: 'Web Development and Graphics',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessAddress: '15 Abayomi Street, Surulere, Lagos.',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        expect(res.body).to.have.property('data').a('object');
        done();
      });
  });
});

// Test for getting all business
describe('GET business', () => {
  it('it should get all businesses', (done) => {
    chai.request(app)
      .get('/api/v1/businesses')
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
      .get('/api/v1/businesses/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('it should return 404 if business is not found', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/8')
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
      .get('/api/v1/businesses?location=Surulere')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the location', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?location=abuja')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('it should get all businesses by category', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=Web Development and Graphics')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the category', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=qrwr')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('it should get all businesses by category and location', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=Web Development and Graphics&location=surulere')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no business in the category and location', (done) => {
    chai.request(app)
      .get('/api/v1/businesses?category=qrwr&location=shaga')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test for POST businesses/:businessId/reviews
describe('POST businesses/:businessId/reviews', () => {
  it('it should not post a review  without title name and description', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/1/reviews')
      .set('x-access-token', token)
      .send({
        name: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it should post a review with name, title, and description', (done) => {
    chai.request(app)
      .post('/api/v1/businesses/1/reviews')
      .set('x-access-token', token)
      .send({
        reviewTitle: 'Excellent web design',
        reviewName: 'Godwin Ekuma',
        reviewDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        done();
      });
  });
});

// Test for get reviews
describe('GET businesses/:id/reviews', () => {
  it('it should return all reviews for a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/1/reviews')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('it should return not found (404) if no reviews are found for a business', (done) => {
    chai.request(app)
      .get('/api/v1/businesses/2/reviews')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test for put  businesses/id
describe('PUT businesses/id', () => {
  it('it should not update a business without name, category and address', (done) => {
    chai.request(app)
      .put('/api/v1/businesses/1')
      .set('x-access-token', token)
      .send({
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessAddress: '1 Fola Ajala Street, Lekki, Lagos',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it should update a business with name category and address', (done) => {
    chai.request(app)
      .put('/api/v1/businesses/1')
      .set('x-access-token', token)
      .send({
        businessName: 'Instrap Solutions Limited',
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessCategory: 'Web Development and Graphics',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessAddress: '15 Abayomi Street, Surulere, Lagos.',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        done();
      });
  });
});

// Test for getting undefind rouotes
describe('GET undefined route', () => {
  it('Should return 404 for the default route', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

// Test for delete business
describe('DELETE businesses/:businessId', () => {
  it('it should delete a business with :businessID', (done) => {
    chai.request(app)
      .delete('/api/v1/businesses/1')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').a('string');
        done();
      });
  });
  it('it should not delete a buiness that does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/businesses/1000')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').a('string');
        done();
      });
  });
});

// Test for default route
describe('GET /', () => {
  it('Should return 200 for the default route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

