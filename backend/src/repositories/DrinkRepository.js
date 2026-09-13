const Drink = require("../models/Drink");

class DrinkRepository {
    async findAll() {
        return await Drink.find();
    }

    async findById(id) {
        return await Drink.findById(id);
    }

    async create(drinkData) {
        return await Drink.create(drinkData);
    }

    async updateById(id, drinkData) {
        return await Drink.findByIdAndUpdate(
            id,
            drinkData,
            {
                new: true,
                runValidators: true
            }
        );
    }
}

module.exports = DrinkRepository;