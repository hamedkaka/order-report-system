const { validationResult } = require("express-validator");
const orderService = require("../services/orderService");

class OrderController {
  async checkOut(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let data = {
        CustomerId: req.user.id,
        ProductIds: req.body.productIds,
        quantity: req.body.quantity,
        AddressId: req.body.addressId,
      };
      const result = await orderService.createOrder(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await orderService.getListOrder();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
