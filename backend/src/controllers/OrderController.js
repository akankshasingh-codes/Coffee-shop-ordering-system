const OrderService = require("../services/OrderService");

class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    createOrder = async (req, res) => {
        try {
            const order = await this.orderService.createOrder(req.body);

            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    getOrderById = async (req, res) => {
        try {
            const order = await this.orderService.getOrderById(
                req.params.id
            );

            res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = OrderController;