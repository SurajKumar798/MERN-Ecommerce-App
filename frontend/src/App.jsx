import { useState } from 'react'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductDetails from './components/ProductDetails';
import ProductList from './admin/ProductList';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import CheckoutAddress from './components/CheckoutAddress';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import Footer from './Footer/Footer';

function Layout(){
  return(
    <>
     <Navbar />
     <Outlet />
     <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {element: <Layout />,
    children: [
       {path: '/', element: <Home />},
       {path: '/login', element: <Login />},
       {path: '/signup', element: <Signup />},
       {path: '/product/:id', element: <ProductDetails />},
       {path: '/cart', element: <Cart />},

       {path: '/admin/products', element: <ProductList />},
       {path: '/admin/products/add', element: <AddProduct />},
       {path: '/admin/products/edit/:id', element: <EditProduct />},
       {path: '/checkout-address', element: <CheckoutAddress />},
       {path: '/checkout', element: <Checkout />},
       {path: '/order-success/:id', element: <OrderSuccess />}
    ],
  },
]);
function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
