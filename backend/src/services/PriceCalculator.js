class PriceCalculator {
    calculateItemPrice(basePrice, customizations, quantity) {
        let customizationTotal = 0;

        for (const customization of customizations) {
            customizationTotal += customization.priceAdjustment;
        }

        const unitPrice = basePrice + customizationTotal;
        const totalPrice = unitPrice * quantity;

        return {
            unitPrice,
            totalPrice
        };
    }

    calculateOrderTotal(items) {
        let orderTotal = 0;

        for (const item of items) {
            orderTotal += item.totalPrice;
        }

        return orderTotal;
    }
}

module.exports = PriceCalculator;