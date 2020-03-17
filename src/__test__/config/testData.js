// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import dotenv from 'dotenv';

dotenv.config();

const userData = {
  nonExistingUser: {
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  existingUser: {
    firstName: 'Thor',
    lastName: 'Odin',
    email: 'thorodin@asgard.com',
    password: process.env.TEST_USER_PASSWORD
  },
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
  }
};

const prescription = {
  validPrescription: {
    drugName: 'Diazepam',
    dosePerTime: 2,
    dosePerDay: 4,
    usageDuration: 10,
    usageFreq: 'Morning Evening'
  }
};

export { userData, prescription };
