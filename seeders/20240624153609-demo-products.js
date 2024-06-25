'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      { name: 'Valentines Box', description: 'A romantic gift box', price: 99.99, stock: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Birthday Box', description: 'A birthday celebration box', price: 49.99, stock: 15, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Client Gift Box', description: 'A gift box for clients', price: 79.99, stock: 20, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
