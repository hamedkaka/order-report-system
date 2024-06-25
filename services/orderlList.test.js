const request = require('supertest');
const app = require('../app');
const { Order} = require('../models');

jest.mock('../models');

describe('Order List API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of orders with the required fields', async () => {
    const orderList = [
      {
        id: 1,
        CustomerId: 1,
        AddressId: 1,
        createdAt: "2024-06-25T01:17:56.000Z",
        updatedAt: "2024-06-25T01:17:56.000Z",
        Customer: {
          id: 1,
          name: "JEF",
          email: "k@k.com"
        },
        Address: {
          id: 1,
          street: "JEF",
          city: "k@k.com",
          state: "ON",
          zip: "555"
        },
        OrderProducts: [
          {
            id: 1,
            ProductId: 1,
            OrderId: 1,
            price: 99.99,
            createdAt: "2024-06-25T01:17:56.000Z",
            updatedAt: "2024-06-25T01:17:56.000Z",
            Product: {
              id: 1,
              name: "Valentines Box",
              ProductItems: [
                { id: 1, ProductId: 1, ItemId: 1, Item: { id: 1, name: "Red Roses Bouquet" } },
                { id: 2, ProductId: 1, ItemId: 2, Item: { id: 2, name: "Box of chocolates" } },
                { id: 3, ProductId: 1, ItemId: 3, Item: { id: 3, name: "Love card" } },
                { id: 4, ProductId: 1, ItemId: 4, Item: { id: 4, name: "Women’s perfume" } }
              ]
            }
          },
          {
            id: 2,
            ProductId: 2,
            OrderId: 1,
            price: 49.99,
            createdAt: "2024-06-25T01:17:56.000Z",
            updatedAt: "2024-06-25T01:17:56.000Z",
            Product: {
              id: 2,
              name: "Birthday Box",
              ProductItems: [
                { id: 5, ProductId: 2, ItemId: 5, Item: { id: 5, name: "Birthday cupcake" } },
                { id: 6, ProductId: 2, ItemId: 6, Item: { id: 6, name: "$100 Visa Gift Card" } },
                { id: 7, ProductId: 2, ItemId: 7, Item: { id: 7, name: "Birthday card" } }
              ]
            }
          }
        ]
      }
    ];

    Order.findAll.mockResolvedValue(orderList);

    const response = await request(app)
      .get('/order/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach(order => {
      expect(order).toHaveProperty('OrderId');
      expect(order).toHaveProperty('TotalOrder');
      expect(order).toHaveProperty('ShippingAddress');
      expect(order).toHaveProperty('OrderDate');
      expect(order).toHaveProperty('LineItems');

      // Check that TotalOrder equals the length of LineItems
      expect(order.TotalOrder).toBe(order.LineItems.length);

      // Check each line item
      order.LineItems.forEach(lineItem => {
        expect(lineItem).toHaveProperty('id');
        expect(lineItem).toHaveProperty('ProductId');
        expect(lineItem).toHaveProperty('OrderId');
        expect(lineItem).toHaveProperty('price');
        expect(lineItem).toHaveProperty('Product');
        expect(lineItem.Product).toHaveProperty('name');
        expect(lineItem.Product).toHaveProperty('ProductItems');
        lineItem.Product.ProductItems.forEach(productItem => {
          expect(productItem).toHaveProperty('Item');
          expect(productItem.Item).toHaveProperty('name');
        });
      });
    });
  });
});
