const Sequelize = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "unique_username"
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enc_password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "unique_username",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
