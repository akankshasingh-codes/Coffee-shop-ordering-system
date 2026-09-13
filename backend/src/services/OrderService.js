const DrinkRepository = require("../repositories/DrinkRepository");
const CustomizationRepository = require("../repositories/CustomizationRepository");
const OrderRepository = require("../repositories/OrderRepository");
const PriceCalculator = require("./PriceCalculator");

class OrderService {
    constructor() 
    {
        this.drinkRepository = new DrinkRepository();
        this.customizationRepository = new CustomizationRepository();
        this.orderRepository = new OrderRepository();
        this.priceCalculator = new PriceCalculator();
    }

    async createOrder(orderData) 
    {
        const { items } = orderData;

        if (!items || items.length === 0) 
        {
            throw new Error("Order must contain at least one item");
        }

        const orderItems = [];

        for (const item of items) 
        {

            if (!Number.isInteger(item.quantity) || item.quantity < 1)
                 {
                throw new Error("Quantity must be a positive integer");
                }

            const drink = await this.drinkRepository.findById(item.drinkId);

            if (!drink) 
            {
                throw new Error(`Drink not found: ${item.drinkId}`);
            }

            if (!drink.isAvailable) 
            {
                throw new Error(`${drink.name} is currently unavailable`);
            }

            const customizationIds = item.customizationIds || [];

            const customizations = [];

            for (const customizationId of customizationIds) 
            {
                const customization = await this.customizationRepository.findById( customizationId);

                if (!customization) 
                {
                    throw new Error( `Customization not found: ${customizationId}`);
                }

                if (!customization.isAvailable) 
                {
                    throw new Error( `${customization.name} is currently unavailable`);
                }

                customizations.push(customization);
            }

        const { unitPrice, totalPrice } =
        this.priceCalculator.calculateItemPrice(
        drink.basePrice,
        customizations,
        item.quantity);

        const customizationSnapshots = customizations.map((customization) => ({
        customizationId: customization._id,
        name: customization.name,
        priceAdjustment: customization.priceAdjustment }));

        orderItems.push({
        drinkId: drink._id,
        drinkName: drink.name,
        quantity: item.quantity,
        basePrice: drink.basePrice,
        customizations: customizationSnapshots,
        unitPrice,
        totalPrice});

        }

    const totalPrice =
    this.priceCalculator.calculateOrderTotal(orderItems);

    const order = await this.orderRepository.create({
    items: orderItems,
    totalPrice});

    return order;
    }

    async getOrderById(id) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
        throw new Error("Order not found");
    }

    return order;
}
}

module.exports = OrderService;