# Coffee Shop Ordering System

This is a full-stack Coffee Shop Ordering System built using React, Node.js, Express and MongoDB.

The application allows customers to select drinks, customize them, choose quantity, review their order and place the order.

The main focus of the project is to keep the pricing logic in the backend and make the system easy to extend with new drinks and customizations.

---

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Testing
- Postman

---

## Features

- View available drinks
- Select a drink
- Add customizations
- Select quantity
- Add multiple drinks to an order
- Add the same drink with different customizations
- Remove items from the order
- Calculate order total
- Place an order
- Validate drinks and customizations
- Store order-time prices

---
## Screenshots

### Menu

![Coffee Shop Menu](screenshots/menu.png)

### Order Summary

![Order Summary](screenshots/order-summary.png)

### Order Confirmation

![Order Confirmation](screenshots/order-confirmation.png)

---

## Backend Structure

I used a simple layered structure:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models
   ↓
MongoDB