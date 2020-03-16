import { chai, expect } from '../config/setup';
import userData from '../config/testData';
import app from '../../index';

describe('user controller', () => {
  describe('Signup', () => {
    it('signs up a new user with valid data', done => {
      const {
        validData: { firstName, lastName }
      } = userData;
      chai
        .request(app)
        .post('/api/signup')
        .send(userData.validData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal('signup was successful');
          expect(res.body.user.firstName).to.equal(firstName);
          expect(res.body.user.lastName).to.equal(lastName);
          expect(res.body.user).to.have.property('token');
          done();
        });
    });

    it('returns an error for an existing user', done => {
      chai
        .request(app)
        .post('/api/signup')
        .send(userData.validData)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Email already exists');
          done();
        });
    });
  });

  describe('login', () => {
    it('returns an error for a non-existent user', done => {
      chai
        .request(app)
        .post('/api/login')
        .send(userData.nonExistingUser)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('incorrect email or password');
          done();
        });
    });

    it('logs in an existing user', done => {
      const {
        existingUser: { firstName, lastName, email }
      } = userData;
      chai
        .request(app)
        .post('/api/login')
        .send(userData.existingUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('login successful');
          expect(res.body.user.firstName).to.equal(firstName);
          expect(res.body.user.lastName).to.equal(lastName);
          expect(res.body.user.email).to.equal(email);
          expect(res.body.user).to.have.property('token');
          done();
        });
    });
  });
});
