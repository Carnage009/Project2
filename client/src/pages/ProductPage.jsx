import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const getProduct = (productId) => {
  return axios.get("http://localhost:8888/api/products/" + productId);
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [productCount, setProductCount] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const products = useSelector((s) => s.cart.products);
  const dispatch = useDispatch();

  const checkProductInCart = () => {
    const p = products.find((p) => p._id === product._id);
    if (p) {
      setIsProductInCart(true);
    }
  };

  const handleCart = () => {
    product.count = productCount;
    dispatch(addToCart({ product }));
  };

  const handleProductCount = (type) => {
    if (type === "add") {
      setProductCount(productCount + 1);
    } else {
      productCount > 1 && setProductCount(productCount - 1);
      }
    }

  useEffect(() => {
    getProduct(id).then((product) => setProduct(product.data));
  }, []);

  useEffect(() => {
    checkProductInCart();
  }, [products, product]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.descr}</Desc>
          <Price>{product.price}</Price>
          {isProductInCart ? (
            <h4>Такой продукт уже имеется в корзине</h4>
          ) : (
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleProductCount("remove")} />
                <Amount>{productCount}</Amount>
                <Add onClick={() => handleProductCount("add")} />
              </AmountContainer>
              <Button onClick={handleCart}>ДОБАВИТЬ В КОРЗИНУ</Button>
            </AddContainer>
          )}
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductPage;
