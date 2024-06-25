
const { Product } = require("../models");

class AddressRepository {
  async getListByIds(idsArray) {
    return await Product.findAll({
      where: {
        id: idsArray
      }
    });
  }

}

module.exports = new AddressRepository();
