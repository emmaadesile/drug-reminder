import { expect } from '../config/setup';
import { userData } from '../config/testData';
import { validateSignup, validateLogin } from '../../utils/validation';

describe('validate signup', () => {
  it('returns an error for invalid firstname', done => {
    const resp = {
      error: { firstName: 'Please enter your firstName' },
      isValid: false
    };

    expect(validateSignup(userData.withoutFirstName)).to.have.a.property(
      'error'
    );
    expect(validateSignup(userData.withoutFirstName)).to.have.a.property(
      'isValid'
    );
    expect(JSON.stringify(validateSignup(userData.withoutFirstName))).to.equal(
      JSON.stringify(resp)
    );
    done();
  });

  it('returns an error for invalid lastname', done => {
    const resp = {
      error: { lastName: 'Please enter your lastName' },
      isValid: false
    };
    expect(validateSignup(userData.withoutLastName)).to.have.a.property(
      'error'
    );
    expect(validateSignup(userData.withoutLastName)).to.have.a.property(
      'isValid'
    );
    expect(JSON.stringify(validateSignup(userData.withoutLastName))).to.equal(
      JSON.stringify(resp)
    );
    done();
  });

  it('returns an error for invalid password', done => {
    const resp = {
      error: { password: 'Please enter your password' },
      isValid: false
    };

    expect(validateSignup(userData.withoutPassword)).to.have.a.property(
      'error'
    );
    expect(validateSignup(userData.withoutPassword)).to.have.a.property(
      'isValid'
    );
    expect(JSON.stringify(validateSignup(userData.withoutPassword))).to.equal(
      JSON.stringify(resp)
    );
    done();
  });

  it('returns an error if password does not contain a number', done => {
    const resp = {
      error: { password: 'Password must contain a number' },
      isValid: false
    };

    expect(validateSignup(userData.passwordWithoutNum)).to.have.a.property(
      'error'
    );
    expect(validateSignup(userData.passwordWithoutNum)).to.have.a.property(
      'isValid'
    );
    expect(
      JSON.stringify(validateSignup(userData.passwordWithoutNum))
    ).to.equal(JSON.stringify(resp));
    done();
  });

  it('returns an error if email is empty', done => {
    const resp = {
      error: { email: 'Please enter your email' },
      isValid: false
    };

    expect(validateSignup(userData.withoutEmail)).to.have.a.property('error');
    expect(validateSignup(userData.withoutEmail)).to.have.a.property('isValid');
    expect(JSON.stringify(validateSignup(userData.withoutEmail))).to.equal(
      JSON.stringify(resp)
    );
    done();
  });

  it('returns an error for invalid email', done => {
    const resp = {
      error: { email: 'Please enter a valid email' },
      isValid: false
    };

    expect(validateSignup(userData.invalidEmail)).to.have.a.property('error');
    expect(validateSignup(userData.invalidEmail)).to.have.a.property('isValid');
    expect(JSON.stringify(validateSignup(userData.invalidEmail))).to.equal(
      JSON.stringify(resp)
    );
    done();
  });
});
