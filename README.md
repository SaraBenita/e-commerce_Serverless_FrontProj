# E-Commerce Serverless Application

This is a serverless e-commerce web application that allows users to register, log in, browse products, add products (for sellers), manage their cart, and complete purchases. The application is built using HTML, CSS, JavaScript, and local storage for data persistence.

## Features

### User Features
- **Registration**: Users can register as either a buyer or a seller.
- **Login**: Users can log in using their email and password.
- **Product Browsing**: Buyers can browse available products.
- **Cart Management**: Buyers can add products to their cart and proceed to checkout.
- **Payment**: Buyers can complete their purchases with a simulated payment process.
- **Profile Management**: Users can update their personal details.

### Seller Features
- **Add Products**: Sellers can add new products to the platform.
- **Manage Products**: Sellers can view, edit, and delete their products.
- **Sales Tracking**: Sellers can track the sales of their products.

## Project Structure

### Key Files
- **HTML Pages**: Located in the `pages/` directory, these include pages like `home.html`, `register.html`, `login.html`, and more.
- **CSS Styles**: Located in the `styles/` directory, these define the styling for each page.
- **JavaScript Logic**: Located in the `scripts/` directory, these handle the functionality of the application, such as user registration, product management, and cart operations.
- **Coupon Data**: The `data/cupons.json` file contains predefined coupon codes and their respective discounts.

## How to Run the Project

1. Clone the repository to your local machine.
2. Open the project in Visual Studio Code.
3. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension if not already installed.
4. Start the Live Server by right-clicking on any HTML file and selecting "Open with Live Server."
5. Access the application in your browser at `http://127.0.0.1:5501`.

## Usage

### Registration
- Navigate to the `Register` page.
- Fill in the required details, including username, password, email, phone, gender, city, and profile picture.
- Choose whether to register as a user or a seller.

### Login
- Navigate to the `Login` page.
- Enter your registered email and password to log in.

### Browsing Products
- Visit the `Home` page to view all available products.
- Click on a product to view its details.

### Cart and Payment
- Add products to your cart.
- Proceed to the `Cart` page to view your selected items.
- Click "Proceed to Pay" to complete the purchase.

### Seller Features
- Sellers can add new products via the `Add Product` page.
- Manage existing products on the `My Product` page.

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap
- **Logic**: JavaScript, jQuery
- **Data Storage**: Local Storage
- **Serverless**: No backend server; all data is stored locally in the browser.

## Screenshots

### Home Page
![Home Page](images/home.png)

### Product Page
![Product Page](images/product.png)

### Cart Page
![Cart Page](images/cart.png)

### Payment Page
![Payment Page](images/payment.png)

