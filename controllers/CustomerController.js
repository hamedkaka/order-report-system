const addressService = require("../services/addressService");
const customerService = require("../services/customerService");
const { validationResult } = require("express-validator");

class CustomerController {
  async createCustomer(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { customer, token } = await customerService.register(req.body);
      res.status(201).json({ customer, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async loginCustomer(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const { customer, token } = await customerService.login(email, password);
      res.status(200).json({ customer, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async addAddress(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const address = await addressService.createAddress({
        ...req.body,
        CustomerId: req.params.customerId,
      });
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const address = await addressService.updateAddress(
        req.params.addressId,
        req.body
      );
      if (!address || !address[0]) {
        return res.status(404).json({ error: "Address not found" });
      }
      const updatedAddress = await addressService.getAddressById(
        req.params.addressId
      );

      res.status(200).json(updatedAddress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CustomerController();
