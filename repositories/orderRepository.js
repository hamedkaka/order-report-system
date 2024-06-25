const { Order, Product, ProductItem, Customer, Address, OrderProduct, Item } = require("../models");

class OrderRepository {
  async create(orderData, products) {
    const order = await Order.create(orderData);
    const orderLineItems = products.map(product => ({
      OrderId: order.id,
      ProductId: product.id,
      productName: product.name,
      price: product.price,
    }));

    await OrderProduct.bulkCreate(orderLineItems);

    return order
  }

  async list() {
 //This part is the key part to solve this issue
    const orders = await Order.findAll({
      include: [
        {
          model: OrderProduct,
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductItem,
                  include: [
                    {
                      model: Item,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Customer,
        },
        {
          model: Address,
        },
      ],
    });
    return orders;
  }
}

module.exports = new OrderRepository();
