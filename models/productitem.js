
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductItem extends Model {
    static associate(models) {
      ProductItem.belongsTo(models.Product, { foreignKey: "ProductId" });
      ProductItem.belongsTo(models.Item, { foreignKey: "ItemId" });
    }
  }
  ProductItem.init({
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    ItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductItem',
  });
  return ProductItem;
};
