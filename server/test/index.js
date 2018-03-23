import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

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
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
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
        expect(res.body).to.have.property('message').a('string');
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
        expect(res.body).to.have.property('isJoi');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('details');
        expect(res.body).to.have.property('_object');
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
