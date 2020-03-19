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
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultBValue: false
      }
    },
    {
      hooks: {
        beforeCreate: signupDetails => {
          // eslint-disable-next-line no-param-reassign
          signupDetails.hashedPassword = bcrypt.hashSync(
            signupDetails.hashedPassword,
            10
          );
        }
      }
    }
  );
  User.associate = models => {
    const { Prescription } = models;

    User.hasMany(Prescription, {
      as: 'prescription',
      onDelete: 'CASCADE',
      foreignKey: 'prescriptionId'
    });
  };
  return User;
};
