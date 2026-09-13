const CustomizationRepository = require("../repositories/CustomizationRepository");

class CustomizationController {
    constructor() {
        this.customizationRepository = new CustomizationRepository();
    }

    getCustomizations = async (req, res) => {
        try {
            const customizations =
                await this.customizationRepository.findAll();

            res.status(200).json({
                success: true,
                data: customizations
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    createCustomization = async (req, res) => {
        try {
            const customization =
                await this.customizationRepository.create(req.body);

            res.status(201).json({
                success: true,
                message: "Customization created successfully",
                data: customization
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    updateCustomization = async (req, res) => {
        try {
            const customization =
                await this.customizationRepository.updateById(
                    req.params.id,
                    req.body
                );

            if (!customization) {
                return res.status(404).json({
                    success: false,
                    message: "Customization not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Customization updated successfully",
                data: customization
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
}

module.exports = CustomizationController;