const Order = require("../models/Order");

class OrderRepository {
    async create(orderData) {
        return await Order.create(orderData);
    }

    async findById(id) {
        return await Order.findById(id);
    }
}

module.exports = OrderRepository;