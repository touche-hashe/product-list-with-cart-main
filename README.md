#  Shopping Cart Project

This project is a *Mini E-commerce Shopping Cart System* built with *Vanilla JavaScript, HTML, and CSS*.  
It allows users to browse products, add them to a cart, manage quantities, and confirm orders with a simple and responsive UI.

---

##  Features

- Fetch products dynamically from a local data.json file.
- Display product details (image, name, category, description, price).
- *Add to Cart* functionality:
  - Replace the "Add to Cart" button with quantity controls (+ / -).
  - Increase or decrease product quantity directly from the product card.
- *Cart Management*:
  - View all items added to the cart with quantities and total prices.
  - Real-time cart total and number of items.
  - Remove items from the cart when quantity = 0.
- *Order Confirmation*:
  - "Confirm Order" button shows a modal with the final list of products and total bill.
  - Toast notification using [Toastify.js](https://apvarun.github.io/toastify-js/) when confirming an order.
- Empty cart state handling with user-friendly messages.

---

##  Technologies Used

- *HTML5* for structure
- *CSS3* for styling
- *JavaScript (Vanilla)* for interactivity
- *Toastify.js* for notifications

---

##  Project Structure
project-folder/
│── index.html # Main HTML file
│── style.css # Stylesheet
│── script.js # Main JavaScript logic
│── data.json # Product data (images, names, prices, etc.)
│── assets/ # (Optional) Folder for images or other resources
