"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.Customer, {
        foreignKey: "CustomerId",
        as: "customer",
      });
    }
  }
  Address.init(
    {
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      CustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
