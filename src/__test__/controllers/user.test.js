import { chai, expect } from '../config/setup';
import userData from '../config/testData';
import app from '../../index';

describe('user controller', () => {
  it('signs up a new user with valid data', done => {
    chai
      .request(app)
      .post('/api/signup')
      .send(userData.validData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.have.equal('Signup was successful');
        expect(res.body.user).to.have.property('firstName');
        expect(res.body.user).to.have.property('lastName');
        expect(res.body.user).to.have.property('token');
        done();
      });
  });
});
