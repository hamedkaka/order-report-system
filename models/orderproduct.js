"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // OrderProduct.belongsTo(models.Product, { foreignKey: "ProductId" });
      OrderProduct.hasMany(models.Order, { foreignKey: "id" });
      OrderProduct.hasMany(models.Product, { foreignKey: "id" });
    }
  }
  OrderProduct.init(
    {
      ProductId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "OrderProduct",
    }
  );
  return OrderProduct;
};
