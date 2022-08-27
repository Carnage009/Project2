import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

const ProductsWrapper = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 1px 1px 0 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const getAllProducts = () => {
  return axios.get("http://localhost:8888/api/products");
};

const columns = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "price", headerName: "Price", width: 200 },
];
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);
  return (
    <div style={{ width: "64%" }}>
      <h1 style={{ width: "100%" }}>Продукты</h1>
      <ProductsWrapper>
        <DataGrid
          getRowId={(row) => row._id}
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </ProductsWrapper>
    </div>
  );
};

export default ProductsPage;
