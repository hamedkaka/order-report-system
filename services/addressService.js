// services/addressService.js

const addressRepository = require("../repositories/addressRepository");

class AddressService {
  async createAddress(addressData) {
    return await addressRepository.create(addressData);
  }

  async getAddressById(id) {
    return await addressRepository.findById(id);
  }

  async getAllAddresses() {
    return await addressRepository.findAll();
  }

  async updateAddress(id, addressData) {
    return await addressRepository.update(id, addressData);
  }

  async deleteAddress(id) {
    return await addressRepository.delete(id);
  }
}

module.exports = new AddressService();
