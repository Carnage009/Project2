import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./pages/EditProfile";

const App = () => {
  const user = useSelector((s) => s.auth.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/editprofile"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
