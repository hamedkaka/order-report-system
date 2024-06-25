'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    return queryInterface.bulkInsert('Customers', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};