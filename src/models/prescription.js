module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    'Prescription',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      prescriptionId: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
        ])
      },
      verifyDrugUsage: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      }
    },
    {
      hooks: {
        beforeCreate: prescriptionData => {
          const { dosePerTime, usageFreq } = prescriptionData;
          const freq = usageFreq.split(' ').length * dosePerTime;
          prescriptionData.verifyDrugUsage = Array.from(
            { length: freq },
            () => 0
          );
        }
      }
    }
  );
  Prescription.associate = models => {
    const { User } = models;

    Prescription.belongsTo(User, {
      foreignKey: 'userId'
    });
  };
  return Prescription;
};
