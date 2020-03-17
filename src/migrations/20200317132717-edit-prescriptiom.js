module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Prescriptions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false
    }),

  down: (queryInterface /* Sequelize */) =>
    queryInterface.removeColumn('Prescriptions', 'userId')
};
