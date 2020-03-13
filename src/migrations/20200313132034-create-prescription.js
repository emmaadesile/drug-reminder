'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drugName: {
        type: Sequelize.STRING
      },
      dosage: {
        type: Sequelize.STRING
      },
      verifyDrugUsage: {
        type: Sequelize.STRING
      },
      drugUsePerDay: {
        type: Sequelize.INTEGER
      },
      timeOfUsage: {
        type: Sequelize.ENUM([
          'Morning',
          'Evening',
          'Morning Evening',
          'Morning Afternoon',
          'Afternoon Evening',
          'Morning Afternoon Evening'
        ])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prescriptions');
  }
};
