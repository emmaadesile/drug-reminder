const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeCreate: signupDetails => {
          signupDetails.hashedPassword = bcrypt.hashSync(
            signupDetails.hashedPassword,
            10
          );
        }
      }
    }
  );
  User.associate = models => {
    // associations can be defined here
    const { Prescription } = models;

    User.hasMany(Prescription, {
      as: 'prescriptions',
      foreignKey: 'prescriptionId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
