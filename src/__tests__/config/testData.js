import faker from 'faker';

const userData = {
  validData: {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }
};

export default userData;
