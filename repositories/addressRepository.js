const { Address } = require("../models");

class AddressRepository {
  async create(addressData) {
    return await Address.create(addressData);
  }

  async findById(id) {
    return await Address.findByPk(id);
  }

  async findAll() {
    return await Address.findAll();
  }

  async update(id, addressData) {
    return await Address.update(addressData, {
      where: { id },
      returning: true
    });
  }

  async delete(id) {
    return await Address.destroy({
      where: { id },
    });
  }
}

module.exports = new AddressRepository();
