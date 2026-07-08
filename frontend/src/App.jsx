import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Profile from "./components/Profile/UpdateProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Success from "./components/Success/Success";
import Orders from "./components/Orders/Orders";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Wishlist from "./components/Wishlist/Wishlist";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
    path="/cart"
    element={
        <ProtectedRoute>
            <Cart />
        </ProtectedRoute>
    }
/>

        <Route
    path="/products/:id"
    element={
        <ProtectedRoute>
            <ProductDetails />
        </ProtectedRoute>
    }
/>

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/payment"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>


<Route
  path="/success"
  element={
    <ProtectedRoute>
      <Success />
    </ProtectedRoute>
  }
/>


<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>


<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>


<Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>



        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;