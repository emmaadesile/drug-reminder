module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    'Prescription',
    {
      drugName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dosePerTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dosePerDay: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usageDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usageFreq: {
        type: DataTypes.ENUM([
          'Morning',
          'Evening',
          'Morning Evening',
          'Morning Afternoon',
          'Afternoon Evening',
          'Morning Afternoon Evening'
        ]),
        allowNull: false
      },
      verifyDrugUsage: DataTypes.INTEGER
    },
    {}
  );
  Prescription.associate = models => {
    // associations can be defined here
    const { User } = models;

    Prescription.belongsTo(User, {
      foreignKey: 'userId'
    });
  };
  return Prescription;
};
