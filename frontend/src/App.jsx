import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
    const [drinks, setDrinks] = useState([]);
    const [customizations, setCustomizations] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedCustomizations, setSelectedCustomizations] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [orderItems, setOrderItems] = useState([]);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Fetch drinks and customizations when page loads
    useEffect(() => {
        fetchDrinks();
        fetchCustomizations();
    }, []);

    // Get all drinks from backend
    const fetchDrinks = async () => {
        try {
            const response = await fetch(`${API_URL}/drinks`);
            const data = await response.json();

            setDrinks(data.data);
        } catch (error) {
            console.error("Failed to fetch drinks:", error);
        }
    };

    // Get all customizations from backend
    const fetchCustomizations = async () => {
        try {
            const response = await fetch(`${API_URL}/customizations`);
            const data = await response.json();

            setCustomizations(data.data);
        } catch (error) {
            console.error("Failed to fetch customizations:", error);
        }
    };

    // Select a drink for customization
    const selectDrink = (drink) => {
        setSelectedDrink(drink);
        setSelectedCustomizations([]);
        setQuantity(1);
    };

    // Select or unselect a customization
    const toggleCustomization = (customizationId) => {
        setSelectedCustomizations((current) => {
            if (current.includes(customizationId)) {
                return current.filter((id) => id !== customizationId);
            }

            return [...current, customizationId];
        });
    };

    // Calculate price of one customized drink
    const calculateUnitPrice = () => {
        if (!selectedDrink) {
            return 0;
        }

        const customizationPrice = customizations
            .filter((customization) =>
                selectedCustomizations.includes(customization._id)
            )
            .reduce(
                (total, customization) =>
                    total + customization.priceAdjustment,
                0
            );

        return selectedDrink.basePrice + customizationPrice;
    };

    // Add selected drink to order
    const addToOrder = () => {
        if (!selectedDrink) {
            return;
        }

        const unitPrice = calculateUnitPrice();

        const newItem = {
            drinkId: selectedDrink._id,
            drinkName: selectedDrink.name,
            quantity,
            customizationIds: selectedCustomizations,
            unitPrice,
            totalPrice: unitPrice * quantity
        };

        setOrderItems((currentItems) => [
            ...currentItems,
            newItem
        ]);

        // Reset customization section
        setSelectedDrink(null);
        setSelectedCustomizations([]);
        setQuantity(1);
    };

    // Remove an item from the order
    const removeFromOrder = (indexToRemove) => {
        setOrderItems((currentItems) =>
            currentItems.filter(
                (_, index) => index !== indexToRemove
            )
        );
    };

    // Calculate complete order total
    const orderTotal = orderItems.reduce(
        (total, item) => total + item.totalPrice,
        0
    );

    // Place order through backend API
    const placeOrder = async () => {
        if (orderItems.length === 0) {
            return;
        }

        try {
            setIsPlacingOrder(true);

            const orderData = {
                items: orderItems.map((item) => ({
                    drinkId: item.drinkId,
                    quantity: item.quantity,
                    customizationIds: item.customizationIds
                }))
            };

            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            alert(
                `Order placed successfully!\nTotal: ₹${data.data.totalPrice}`
            );

            // Clear current cart after successful order
            setOrderItems([]);
        } catch (error) {
            alert(
                `Failed to place order: ${error.message}`
            );
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <h1>☕ Coffee Shop</h1>
                <p>Choose your favourite coffee</p>
            </header>

            <main className="container">

                {/* Menu */}
                <section className="menu-section">
                    <h2>Our Menu</h2>

                    <div className="drink-grid">
                        {drinks.map((drink) => (
                            <div
                                className="drink-card"
                                key={drink._id}
                            >
                                <div className="coffee-icon">
                                    ☕
                                </div>

                                <h3>{drink.name}</h3>

                                <p className="price">
                                    ₹{drink.basePrice}
                                </p>

                                <button
                                    onClick={() =>
                                        selectDrink(drink)
                                    }
                                    disabled={!drink.isAvailable}
                                >
                                    {drink.isAvailable
                                        ? "Customize"
                                        : "Unavailable"}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Customization */}
                {selectedDrink && (
                    <section className="customization-section">

                        <h2>
                            Customize Your{" "}
                            {selectedDrink.name}
                        </h2>

                        <div className="customization-list">

                            {customizations.map(
                                (customization) => (
                                    <label
                                        className="customization-item"
                                        key={customization._id}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCustomizations.includes(
                                                customization._id
                                            )}
                                            onChange={() =>
                                                toggleCustomization(
                                                    customization._id
                                                )
                                            }
                                        />

                                        <span>
                                            {
                                                customization.name
                                            }
                                        </span>

                                        <strong>
                                            +₹
                                            {
                                                customization.priceAdjustment
                                            }
                                        </strong>
                                    </label>
                                )
                            )}

                        </div>

                        {/* Quantity */}
                        <div className="quantity">
                            <span>Quantity:</span>

                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            quantity - 1
                                        )
                                    )
                                }
                            >
                                −
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() =>
                                    setQuantity(
                                        quantity + 1
                                    )
                                }
                            >
                                +
                            </button>
                        </div>

                        {/* Selected drink price */}
                        <div className="selected-price">
                            ₹{calculateUnitPrice()} ×{" "}
                            {quantity} = ₹
                            {calculateUnitPrice() *
                                quantity}
                        </div>

                        <button
                            className="add-button"
                            onClick={addToOrder}
                        >
                            Add to Order
                        </button>

                    </section>
                )}

                {/* Order Summary */}
                {orderItems.length > 0 && (
                    <section className="order-section">

                        <h2>Order Summary</h2>

                        {orderItems.map(
                            (item, index) => (
                                <div
                                    className="order-item"
                                    key={index}
                                >

                                    <div>
                                        <h3>
                                            {
                                                item.drinkName
                                            }
                                        </h3>

                                        <p>
                                            Quantity:{" "}
                                            {item.quantity}
                                        </p>
                                    </div>

                                    <div className="order-item-actions">

                                        <strong>
                                            ₹
                                            {
                                                item.totalPrice
                                            }
                                        </strong>

                                        <button
                                            className="remove-button"
                                            onClick={() =>
                                                removeFromOrder(
                                                    index
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                        {/* Total */}
                        <div className="order-total">
                            <span>Total</span>

                            <strong>
                                ₹{orderTotal}
                            </strong>
                        </div>

                        {/* Place Order */}
                        <button
                            className="place-order-button"
                            onClick={placeOrder}
                            disabled={isPlacingOrder}
                        >
                            {isPlacingOrder
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </section>
                )}

            </main>
        </div>
    );
}

export default App;