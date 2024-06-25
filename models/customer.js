"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, { foreignKey: "CustomerId" });
    }

    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      hooks: {
        beforeCreate: async (customer) => {
          if (customer.password) {
            const salt = await bcrypt.genSalt(10);
            customer.password = await bcrypt.hash(customer.password, salt);
          }
        },
      },
    }
  );

  return Customer;
};
