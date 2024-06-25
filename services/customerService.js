const customerRepository = require("../repositories/customerRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class CustomerService {
  async createCustomer(customerData) {
    return await customerRepository.create(customerData);
  }

  async getCustomerById(id) {
    return await customerRepository.findById(id);
  }

  async getAllCustomers() {
    return await customerRepository.findAll();
  }

  async updateCustomer(id, customerData) {
    return await customerRepository.update(id, customerData);
  }

  async deleteCustomer(id) {
    return await customerRepository.delete(id);
  }

  async register(customerData) {
    const customer = await customerRepository.create(customerData);
    const token = this.generateAuthToken(customer);
    return { customer, token };
  }

  async login(email, password) {
    const customer = await customerRepository.findByEmail(email);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error("Invalid email or password");
    }
    const token = this.generateAuthToken(customer);
    return { customer, token };
  }

  generateAuthToken(customer) {
    const payload = { id: customer.id, email: customer.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }
}

module.exports = new CustomerService();
