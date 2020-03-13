module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    'Prescription',
    {
      drugName: DataTypes.STRING,
      dosage: DataTypes.STRING,
      verifyDrugUsage: DataTypes.STRING,
      drugUsePerDay: DataTypes.INTEGER,
      timeOfUsage: DataTypes.ENUM([
        'Morning',
        'Evening',
        'Morning Evening',
        'Morning Afternoon',
        'Afternoon Evening',
        'Morning Afternoon Evening'
      ])
    },
    {}
  );
  Prescription.associate = models => {
    // associations can be defined here
    const { User } = models;

    Prescription.belongsTo(User, {
      foreignKey: 'userId',
    });
  };
  return Prescription;
};
