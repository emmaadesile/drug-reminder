// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const userData = {
  validData: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'drake50'
  },
  withoutFirstName: {
    firstName: '',
    lastName: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'drake50'
  },
  withoutLastName: {
    firstName: faker.name.firstName(),
    lastName: '',
    email: faker.internet.email(),
    password: 'drake50'
  },
  withoutPassword: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: ''
  },
  passwordWithoutNum: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'drake'
  },
  withoutEmail: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: '',
    password: 'drake50'
  },
  invalidEmail: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'drake@mail',
    password: 'drake50'
  },
};

export default userData;
