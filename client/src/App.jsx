import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
