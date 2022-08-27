import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./createProduct.css";
import axios from "axios";

const createProduct = (product) => {
  return axios.post("http://localhost:8888/api/products/create", product);
};

function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productDescr, setProductDescr] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleDisableBtn = () => {
    return !productName || !productDescr || !productPrice || !productImage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: productName,
      descr: productDescr,
      price: productPrice,
      img: productImage,
    };
    createProduct(product)
      .then((res) => {
        console.log(res.data);
        setProductName("");
        setProductDescr("");
        setProductPrice("");
        setProductImage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="createProductForm" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        label="Введите название продукта"
        variant="outlined"
        sx={{ width: "50%" }}
      />
      <TextField
        id="outlined-basic"
        value={productDescr}
        onChange={(e) => setProductDescr(e.target.value)}
        label="Введите описание продукта"
        variant="outlined"
        sx={{ width: "50%", marginTop: "20px" }}
      />
      <TextField
        id="outlined-basic"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        label="Введите цену продукта"
        type="number"
        variant="outlined"
        sx={{ width: "50%", marginTop: "20px" }}
      />
      <TextField
        type={"file"}
        id="outlined-basic"
        value={productImage}
        onChange={(e) => setProductImage(e.target.value)}
        label="Укажите URL картинки"
        variant="outlined"
        sx={{ width: "50%", marginTop: "20px" }}
      />
      <Button
        variant="outlined"
        type="submit"
        sx={{ width: "50%", marginTop: "20px" }}
        disabled={handleDisableBtn()}
      >
        Создать продукт
      </Button>
    </form>
  );
}

export default CreateProduct;
