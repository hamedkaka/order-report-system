// services/addressService.js

const productRepository = require("../repositories/productRepository");

class AddressService {
  async getListById(idsArray) {
    return await productRepository.getListByIds(idsArray);
  }

}

module.exports = new AddressService();
