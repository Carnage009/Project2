import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const [isProductInCart, setIsProductInCart] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((s) => s.cart.products);

  useEffect(() => {
    const product = products.find((p) => p._id === item._id);
    if (product) {
      setIsProductInCart(true);
    }
  }, [products]);

  const handleCartClick = () => {
    if (isProductInCart) {
      toast.error(
        "Товар уже в корзине! для дальнейших манипуляций перейдите в корзину"
      );
    } else {
      item.count = 1;
      dispatch(addToCart({ product: item }));
      toast.success("Товар добавлен в корзину")
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon onClick={handleCartClick}>
          <ShoppingCartOutlined />
        </Icon>
        <NavLink to={`/product/${item._id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </NavLink>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
