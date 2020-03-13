import { chai, expect } from '../config/setup';

describe('user controller', () => {
  it('signs up a new user', () => {
    const newUser = {
      firstName: 'dave',
      lastName: 'batista',
      email: 'davebatista@mail.com',
      password: 'davebatista'
    };
  });
});
