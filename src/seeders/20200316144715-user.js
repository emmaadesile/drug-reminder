const bycrpt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config()

module.exports = {
  up: (queryInterface, /* Sequelize */) =>
    queryInterface.bulkInsert('Users', [
      {
        firstName: 'Thor',
        lastName: 'Odin',
        email: 'thorodin@asgard.com',
        hashedPassword: bycrpt.hashSync(process.env.TEST_USER_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),

  down: (queryInterface, /* Sequelize */) =>
    queryInterface.bulkDelete('Users', null, {})
};
