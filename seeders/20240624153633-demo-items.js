"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Red Roses Bouquet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Box of chocolates",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Love card", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Women’s perfume",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Birthday cupcake",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "$100 Visa Gift Card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Birthday card", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Bottle of wine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Fruit basket", createdAt: new Date(), updatedAt: new Date() },
        { name: "Pen", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});
  },
};
