module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drugName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dosePerDay: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dosePerTime: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      usageDuration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      usageFreq: {
        type: Sequelize.ENUM([
          'Morning',
          'Evening',
          'Morning Evening',
          'Morning Afternoon',
          'Afternoon Evening',
          'Morning Afternoon Evening'
        ]),
        allowNull: false
      },
      verifyDrugUsage: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface /* Sequelize */) =>
    queryInterface.dropTable('Prescriptions')
};
