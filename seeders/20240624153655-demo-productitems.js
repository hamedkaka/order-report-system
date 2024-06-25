"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.sequelize.query(
      `SELECT id, name FROM Products;`
    );

    const items = await queryInterface.sequelize.query(
      `SELECT id, name FROM Items;`
    );

    const productRows = products[0];
    const itemRows = items[0];

    return queryInterface.bulkInsert(
      "ProductItems",
      [
        // Valentines Box Items
        {
          ProductId: productRows.find((p) => p.name === "Valentines Box").id,
          ItemId: itemRows.find((i) => i.name === "Red Roses Bouquet").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Valentines Box").id,
          ItemId: itemRows.find((i) => i.name === "Box of chocolates").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Valentines Box").id,
          ItemId: itemRows.find((i) => i.name === "Love card").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Valentines Box").id,
          ItemId: itemRows.find((i) => i.name === "Women’s perfume").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Birthday Box Items
        {
          ProductId: productRows.find((p) => p.name === "Birthday Box").id,
          ItemId: itemRows.find((i) => i.name === "Birthday cupcake").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Birthday Box").id,
          ItemId: itemRows.find((i) => i.name === "$100 Visa Gift Card").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Birthday Box").id,
          ItemId: itemRows.find((i) => i.name === "Birthday card").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Client Gift Box Items
        {
          ProductId: productRows.find((p) => p.name === "Client Gift Box").id,
          ItemId: itemRows.find((i) => i.name === "Bottle of wine").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Client Gift Box").id,
          ItemId: itemRows.find((i) => i.name === "Fruit basket").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ProductId: productRows.find((p) => p.name === "Client Gift Box").id,
          ItemId: itemRows.find((i) => i.name === "Pen").id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductItems", null, {});
  },
};
