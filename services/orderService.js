const orderRepository = require("../repositories/orderRepository");
const { getListById } = require("./productService");

class OrderService {
  async createOrder(orderData) {
    const productList = await getListById(orderData.ProductIds);

    const order = await orderRepository.create(orderData, productList);

    return order;
  }

  async getListOrder() {
    const orders = await orderRepository.list();
    let orderResult = [];
    for (const order of orders) {
      const {street, city, state, zip } =  order.Address;
      let data = {
        OrderId:order.id,
        TotalOrder: order.OrderProducts.length,
        OrderDate: order.createdAt,
        ShippingAddress: `${street} ${city} ${state} ${zip}`,
        CustomerName: order.Customer.name,
        CustomerEmail: order.Customer.email,
        LineItems: order.OrderProducts
      }

      orderResult.push(data)
    }
    return orderResult;
  }
}

module.exports = new OrderService();
