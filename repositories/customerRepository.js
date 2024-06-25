const { Customer } = require("../models");

class CustomerRepository {
  async create(customerData) {
    return await Customer.create(customerData);
  }

  async findById(id) {
    return await Customer.findByPk(id);
  }

  async findByEmail(email) {
    return await Customer.findOne({ where: { email } });
  }

  async findAll() {
    return await Customer.findAll();
  }

  async update(id, customerData) {
    return await Customer.update(customerData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id) {
    return await Customer.destroy({
      where: { id },
    });
  }
}

module.exports = new CustomerRepository();
