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

// Test for post business
describe('POST businesses', () => {
  it('it should not post a business without name category and address', (done) => {
    chai.request(app)
      .post('/v1/businesses')
      .send({
        id: 1,
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessLogo: '../../template/images/user2.png',
        businessProfileImage: '../../template/images/featured_one.jpg',
        products: [
          {
            id: 1,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            id: 2,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          {
            id: 3,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          {
            id: 4,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          }

        ]
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
        done();
      });
  });
  it('it should post a business with name category and address', (done) => {
    chai.request(app)
      .post('/v1/businesses')
      .send({
        id: 5,
        businessName: 'Instrap Solutions Limited',
        businessPhone: '0133512053',
        businessEmail: 'info@instrap.com',
        businessCategory: 'Web Development and Graphics',
        businessWebsite: 'https//:instrap.com',
        businessDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        businessAddress: '15 Abayomi Street, Surulere, Lagos.',
        businessLogo: '../../template/images/user2.png',
        businessProfileImage: '../../template/images/featured_one.jpg',
        products: [
          {
            id: 1,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
            id: 2,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          {
            id: 3,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          {
            id: 4,
            product: 'UI/UX',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          }

        ]
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('business').a('string');
        done();
      });
  });
});

// Test for post auth/signup
describe('POST auth/signup', () => {
  it('it should not post a signup  without email, password, business name, category and name', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        id: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
        done();
      });
  });
  it('it should post a signup with email, password, business name, category and name', (done) => {
    chai.request(app)
      .post('/v1/auth/signup')
      .send({
        id: 5,
        email: 'blabla@gmail.com',
        password: 'godwin1234',
        businessName: 'Instrap Solutions Limited',
        businessCategory: 'Website Design and Development',
        firstName: 'Godwin',
        lastname: 'Ekuma'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('user').a('string');
        done();
      });
  });
});

// Test for post auth/signin
describe('POST auth/signup', () => {
  it('it should not post a signup  without email and password', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send({
        email: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
        done();
      });
  });
  it('it should post a signup with email and password', (done) => {
    chai.request(app)
      .post('/v1/auth/signin')
      .send({
        email: 'info@gmail.com',
        password: 'godwin1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('login').a('string');
        done();
      });
  });
});

// Test for POST businesses/:businessId/reviews
describe('POST businesses/:businessId/reviews', () => {
  it('it should not post a review  without title name and description', (done) => {
    chai.request(app)
      .post('/v1/businesses/3/reviews')
      .send({
        name: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
        done();
      });
  });
  it('it should post a review with name, title, and description', (done) => {
    chai.request(app)
      .post('/v1/businesses/3/reviews')
      .send({
        id: 45,
        businessId: 1,
        reviewTitle: 'Excellent web design',
        reviewname: 'Godwin Ekuma',
        reviewDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        reviewDate: '02, March, 2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('review').a('string');
        done();
      });
  });
});
