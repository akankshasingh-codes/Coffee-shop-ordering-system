const Customization = require("../models/Customization");

class CustomizationRepository {
    async findAll() {
        return await Customization.find();
    }

    async findById(id) {
        return await Customization.findById(id);
    }

    async create(customizationData) {
        return await Customization.create(customizationData);
    }

    async updateById(id, customizationData) {
        return await Customization.findByIdAndUpdate(
            id,
            customizationData,
            {
                new: true,
                runValidators: true
            }
        );
    }
}

module.exports = CustomizationRepository;