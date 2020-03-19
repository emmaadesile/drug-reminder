module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      prescriptionId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      drugName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dosePerTime: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dosePerDay: {
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
        type: Sequelize.ARRAY(Sequelize.INTEGER)
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
