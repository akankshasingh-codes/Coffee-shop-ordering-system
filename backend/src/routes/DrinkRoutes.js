const express = require("express");
const DrinkController = require("../controllers/DrinkController");

const router = express.Router();
const drinkController = new DrinkController();

router.get("/", drinkController.getDrinks);
router.post("/", drinkController.createDrink);
router.put("/:id", drinkController.updateDrink);

module.exports = router;