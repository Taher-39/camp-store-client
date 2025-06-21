# Halal Zone

## Introduction
Halal Zone is an e-commerce platform dedicated to providing all the essential and fun items for food enthusiasts. This project is designed to offer a user-friendly and visually appealing experience.

## Project Description
Halal Zone aims to cater to outdoor enthusiasts by offering a wide range of food products. The website includes core pages such as the Homepage, Admin and Cutomer Dashboard, Product Details Page, Product Management, Cart Page, and About Us Page and more. The platform is built to ensure seamless navigation, fast loading times, and a consistent design language across all devices.

## Features
- **Homepage**: Captivating products, FAQs, and a unique section.
- **Product Details Page**: Detailed product information, add-to-cart functionality, and quantity management.
- **Product Management**: Admin panel for creating, updating, and deleting products with a confirmation prompt.
- **Cart Page**: View and manage cart items with dynamic pricing and a place order option.
- **Admin Dashboard**: A secure admin panel for managing products, orders, and user accounts.
- **Customer Dashboard**: A secure Customer panel for show orders, track order, and user accounts.
- **About Us Page**: Company mission, contact information, embedded Google Map, and team introductions.
- **UI/UX Enhancements**: Responsive design, Redux for state management, intuitive navigation, and consistent design.
- **User Authentication**: Secure user registration, login, and password recovery.
- **Responsive Design**: Mobile-first approach with responsive 
  
## Technology Stack
- **Frontend**: React, Redux Toolkit, Redux RTK Queary, Tailwind CSS, etc
- **Backend**: Node.js, Express.js, Zod, JWT, Mongoose, etc
- **Database**: MongoDB
- **Payment Gateway**: SllCommarz(will add)
- **Deployment and Hosting**: Vercel
- **Security**: JWT, HTTPS
- **Version Control**: Git, GitHub
  
## Installation Guideline

### Prerequisites
- Node.js
- npm or Yarn
- MongoDB

### Installation Steps

1. **Clone the repository**:
   ```bash
   client: 
   git clone https://github.com/Taher-39/camp-store-client.git
   cd camp-store-client

   server: 
   git clone https://github.com/Taher-39/camp-store-server.git
   cd camp-store-server



3. **Configuration**:
   - Create a `.env` file in the root directory of the server:
     ```env
     NODE_ENV = development
     PORT = 5000
     DB_URL = url-of-db
     BCRYPT_SALT_ROUNDS = 10
     JWT_ACCESS_SECRET = dfafdsfasf
     JWT_ACCESS_EXPIRES_IN = 360d
     ```

4. **Running the Application**:
   - Start the server:
     ```bash
     npm run server
     ```
   - Start the client:
     ```bash
     npm run dev
     ```

## Usage
Visit the deployed client site: [Halal Zone](https://camp-store.vercel.app/)

- **Navigating the site**: Explore various pages like the homepage, products, cart, and more.
- **Managing Products**: Admins can add, update, or delete products via the Product Management page.
- **Checkout**: Users can place orders through Cash on Delivery or Stripe (if integrated).

## Implemented Ideas and Notes
- **Home screen content left-right view fix**
- **Cart clear notification not working** 
- **Post-order success page refresh required**
- **Error handling across all pages**
- **Final deployment link verification**
  
### Optional Implementations:
- Wishlist feature for `Out-of-Stock` products.
- Recently watched products list on the product details page.
- Order details page and order tracking.
- Authentication & Authorization features.
- Centralized color configuration file.
- Detailed product pages with multiple images and color variants.
- Stripe or PayPal payment gateway integration.

## Project Timeline
- **Start Date**: 28/08/2024
- **End Date**: 20/06/2025
