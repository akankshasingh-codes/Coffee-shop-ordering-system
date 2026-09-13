const express = require("express");

const OrderController = require("../controllers/OrderController");

const router = express.Router();

const orderController = new OrderController();

router.post("/", orderController.createOrder);

router.get("/:id", orderController.getOrderById);

module.exports = router;