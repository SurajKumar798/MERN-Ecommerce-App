# MERN-Ecommerce-App
# ⚡ QuickyStore.in

A full-stack e-commerce web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Features product browsing, cart management, address handling, and Cash on Delivery checkout.

---

## 🖥️ Live Demo

> Coming soon / Add your deployed link here

---

## 🚀 Features

- 🔍 **Search & Filter** — Search products by name and filter by category
- 🛒 **Cart Management** — Add, remove, and update item quantities in real time
- 📍 **Address Management** — Save and select delivery addresses at checkout
- 💵 **Cash on Delivery** — Simple COD order placement flow
- 🔐 **Authentication** — JWT-based login and signup
- 👤 **Admin Panel** — Add and manage products
- 📱 **Responsive Design** — Mobile-friendly UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```
quickystore/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance
│   │   ├── admin/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── ProductList.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CheckoutAddress.jsx
│   │   │   └── AddProduct.jsx
│   │   └── App.jsx
│   └── package.json
│
└── server/                   # Express backend
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   ├── Cart.js
    │   ├── Order.js
    │   └── Address.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── cartRoutes.js
    │   ├── orderRoutes.js
    │   └── addressRoutes.js
    ├── controllers/
    │   └── authController.js
    │   ├── productController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   ├── addressController.js
    ├── .env
    └── app.js
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SurajKumar798/MERN_Ecommerce-App.git
cd quickystore
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
MONGO_URI=mongodb://localhost:27017/mern-ecommerce
JWT_SECRET=MYSECRETKEY123
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and receive JWT |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/products` | Get all products (supports `?search=` & `?category=`) |
| POST | `/admin/products/add` | Add a new product (admin) |

---

## 🌍 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
