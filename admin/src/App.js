import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "./pages/ProductsPage/ProductsPage";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Main from "./pages/Main/Main";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import CreateProduct from "./pages/CreateProduct/CreateProduct";

const Wrapper = styled.div`
  display: flex;
`;

function App() {
  const user = useSelector((s) => s.auth.user);
  return (
    <div className="App">
      <Header></Header>
      <Wrapper>
        <Sidebar></Sidebar>
        <Routes>
          <Route
            path="/"
            element={user ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={user ? <ProductPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/createproduct"
            element={user ? <CreateProduct /> : <Navigate to="/login" />}
          />
        </Routes>
      </Wrapper>
    </div>
  );
}

export default App;
