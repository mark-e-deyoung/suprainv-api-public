const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Items', {
    item_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'Items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Items_pkey",
        unique: true,
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
};
