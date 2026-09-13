const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        basePrice: {
            type: Number,
            required: true,
            min: 0
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Drink", drinkSchema);