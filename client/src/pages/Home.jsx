import React from "react";
import Categories from "../components/Categories";
import Layout from "../Layout";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      <Layout >
      <Categories />
      <Products />
      </Layout >
    </div>
  );
};

export default Home;
