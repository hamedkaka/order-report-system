const request = require('supertest');
const app = require('../app'); 
const { Order, Product } = require('../models');
const jwt = require('jsonwebtoken');

jest.mock('../models');

describe('Order Checkout API with Authentication', () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();
    token = jwt.sign({ id: 1, email: 'test@example.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should checkout an order with valid token', async () => {
    const orderData = {
      id: 1,
      CustomerId: 1,
      AddressId: 1,
      updatedAt: "2024-06-25T01:17:56.339Z",
      createdAt: "2024-06-25T01:17:56.339Z"
    };

    const input = {
      productIds: [1, 2, 3],
      quantity: 1,
      addressId: 1
    };

    Product.findAll.mockResolvedValue([
      { id: 1, price: 10 },
      { id: 2, price: 20 },
      { id: 3, price: 30 }
    ]);
    Order.create.mockResolvedValue(orderData);

    const response = await request(app)
      .post('/order/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send(input);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('CustomerId', 1);
    expect(response.body).toHaveProperty('AddressId', 1);
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('createdAt');
  });

  it('should not checkout an order with invalid token', async () => {
    const input = {
      productIds: [1, 2, 3],
      quantity: 1,
      addressId: 1
    };

    const response = await request(app)
      .post('/order/checkout')
      .set('Authorization', 'Bearer invalidtoken')
      .send(input);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid token.');
  });

  it('should return an error if product retrieval fails', async () => {
    const input = {
      productIds: [1, 2, 3],
      quantity: 1,
      addressId: 1
    };

    Product.findAll.mockRejectedValue(new Error('Failed to retrieve products'));

    const response = await request(app)
      .post('/order/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send(input);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Failed to retrieve products');
  });

  it('should return an error if order creation fails', async () => {
    const input = {
      productIds: [1, 2, 3],
      quantity: 1,
      addressId: 1
    };

    Product.findAll.mockResolvedValue([
      { id: 1, price: 10 },
      { id: 2, price: 20 },
      { id: 3, price: 30 }
    ]);
    Order.create.mockRejectedValue(new Error('Failed to create order'));

    const response = await request(app)
      .post('/order/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send(input);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Failed to create order');
  });

    it('should checkout an order with valid token', async () => {
    const orderData = {
      id: 1,
      CustomerId: 1,
      AddressId: 1,
      updatedAt: "2024-06-25T01:17:56.339Z",
      createdAt: "2024-06-25T01:17:56.339Z"
    };

    const input = {
      productIds: [1, 2, 3],
      quantity: 1,
      addressId: 1
    };

    Product.findAll.mockResolvedValue([
      { id: 1, price: 10 },
      { id: 2, price: 20 },
      { id: 3, price: 30 }
    ]);
    Order.create.mockResolvedValue(orderData);

    const response = await request(app)
      .post('/order/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send(input);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('CustomerId', 1);
    expect(response.body).toHaveProperty('AddressId', 1);
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('createdAt');
  });
});
