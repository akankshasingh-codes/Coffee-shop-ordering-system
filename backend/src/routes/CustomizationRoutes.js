const express = require("express");
const CustomizationController = require("../controllers/CustomizationController");

const router = express.Router();
const customizationController = new CustomizationController();

router.get("/", customizationController.getCustomizations);
router.post("/", customizationController.createCustomization);
router.put("/:id", customizationController.updateCustomization);

module.exports = router;