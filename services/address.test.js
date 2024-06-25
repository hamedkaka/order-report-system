const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const { Address } = require('../models');
const jwt = require('jsonwebtoken');

jest.mock('../models');

describe('Customer Address API with Authentication', () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a JWT token for authentication
    token = jwt.sign({ id: 1, email: 'k@k.com' }, process.env.JWT_SECRET , { expiresIn: '1h' });
  });

  it('should add a new address for a customer with valid token', async () => {
    const addressData = {
      street: 'JEF',
      city: 'k@k.com',
      zip: '555',
      state: 'ON'
    };

    Address.create.mockResolvedValue({
      id: 1,
      customerId: 1,
      ...addressData
    });

    const response = await request(app)
      .post('/customer/1/address')
      .set('Authorization', `Bearer ${token}`)
      .send(addressData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('customerId', 1);
    expect(response.body).toHaveProperty('street', 'JEF');
    expect(response.body).toHaveProperty('city', 'k@k.com');
    expect(response.body).toHaveProperty('zip', '555');
    expect(response.body).toHaveProperty('state', 'ON');
  });

  it('should update an address for a customer with valid token', async () => {
    const addressData = {
      street: 'new street',
      city: 'new city',
      zip: '999',
      state: 'NY'
    };

    Address.update.mockResolvedValue([1]); // Sequelize update returns an array with the number of affected rows
    Address.findByPk.mockResolvedValue({ id: 1, customerId: 1, ...addressData });

    const response = await request(app)
      .put('/customer/1/address/1')
      .set('Authorization', `Bearer ${token}`)
      .send(addressData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('customerId', 1);
    expect(response.body).toHaveProperty('street', 'new street');
    expect(response.body).toHaveProperty('city', 'new city');
    expect(response.body).toHaveProperty('zip', '999');
    expect(response.body).toHaveProperty('state', 'NY');
  });

  it('should not add a new address with invalid token', async () => {
    const addressData = {
      street: 'JEF',
      city: 'k@k.com',
      zip: '555',
      state: 'ON'
    };

    const response = await request(app)
      .post('/customer/1/address')
      .set('Authorization', 'Bearer')
      .send(addressData);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Unauthorized');
  });


  it('should return an error if address update fails', async () => {
    const addressData = {
      street: 'new street',
      city: 'new city',
      zip: '999',
      state: 'NY'
    };

    Address.update.mockRejectedValue(new Error('Failed to update address'));

    const response = await request(app)
      .put('/customer/1/address/1')
      .set('Authorization', `Bearer ${token}`)
      .send(addressData);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Failed to update address');
  });
});
