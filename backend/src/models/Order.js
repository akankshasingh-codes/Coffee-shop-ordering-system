const mongoose = require("mongoose");

// Stores customization details inside an order
const customizationSnapshotSchema = new mongoose.Schema(
    {
        customizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customization",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        priceAdjustment: {
            type: Number,
            required: true
        }
    },
    {
        _id: false
    }
);

// Represents one group of identical drinks in an order
const orderItemSchema = new mongoose.Schema(
    {
        drinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drink",
            required: true
        },

        drinkName: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            integer: true,
            min: 1
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0
        },

        customizations: {
            type: [customizationSnapshotSchema],
            default: []
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: true
    }
);

// Main Order schema
const orderSchema = new mongoose.Schema(
    {
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function (items) {
                    return items.length > 0;
                },
                message: "Order must contain at least one item"
            }
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);