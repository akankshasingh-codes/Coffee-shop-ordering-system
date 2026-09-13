const express = require("express");
const cors = require("cors");

const orderRoutes = require("./src/routes/OrderRoutes");
const drinkRoutes = require("./src/routes/DrinkRoutes");
const customizationRoutes = require("./src/routes/CustomizationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Coffee Shop API is running"
    });
});

app.use("/api/drinks", drinkRoutes);
app.use("/api/customizations", customizationRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;