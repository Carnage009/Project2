import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const getProducts = () => {
  return axios("http://localhost:8888/api/products");
}

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products.data)
    });
  }, [])
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
