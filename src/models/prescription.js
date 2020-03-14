module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    'Prescription',
    {
      drugName: DataTypes.STRING,
      dosePerTime: DataTypes.INTEGER,
      dosePerDay: DataTypes.INTEGER,
      usageDuration: DataTypes.INTEGER,
      usageFreq: DataTypes.ENUM([
        'Morning',
        'Evening',
        'Morning Evening',
        'Morning Afternoon',
        'Afternoon Evening',
        'Morning Afternoon Evening'
      ]),
      verifyDrugUsage: DataTypes.INTEGER,
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
