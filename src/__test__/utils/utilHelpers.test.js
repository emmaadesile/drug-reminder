import { expect } from '../config/setup';
import { isEmpty, isUndefined, validateEmail } from '../../utils/utilHelpers';

describe('test util functions', () => {
  it('checks for an empty object', done => {
    expect(isEmpty({})).to.equal(true);
    expect(isEmpty([])).to.equal(true);
    expect(isEmpty('')).to.equal(true);
    done()
  });

  it('checks undefined or null values', done => {
    expect(isUndefined(null)).to.equal(true);
    expect(isUndefined(undefined)).to.equal(true);
    done()
  })

  it('validates email', done => {
    expect(validateEmail('rose@mail')).to.equal(false);
    expect(validateEmail('rose@mail.com')).to.equal(true)
    done();
  })
});
