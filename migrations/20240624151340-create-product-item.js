"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ItemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductItems");
  },
};
