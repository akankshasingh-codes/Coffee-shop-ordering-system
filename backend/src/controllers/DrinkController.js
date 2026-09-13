const DrinkRepository = require("../repositories/DrinkRepository");

class DrinkController {
    constructor() {
        this.drinkRepository = new DrinkRepository();
    }

    getDrinks = async (req, res) => {
        try {
            const drinks = await this.drinkRepository.findAll();

            res.status(200).json({
                success: true,
                data: drinks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    createDrink = async (req, res) => {
        try {
            const drink = await this.drinkRepository.create(req.body);

            res.status(201).json({
                success: true,
                message: "Drink created successfully",
                data: drink
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    updateDrink = async (req, res) => {
        try {
            const drink = await this.drinkRepository.updateById(
                req.params.id,
                req.body
            );

            if (!drink) {
                return res.status(404).json({
                    success: false,
                    message: "Drink not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Drink updated successfully",
                data: drink
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = DrinkController;