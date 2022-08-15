import { Add, Remove, TouchAppOutlined } from "@material-ui/icons";
import styled from "styled-components";
import Layout from "../Layout";
import { mobile } from "../responsive";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../context/Context";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeProductFromCart } from "../redux/cartSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  let navigate = useNavigate();
  const { user } = useContext(Context);
  const products = useSelector((s) => s.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addToCart({ product }));
  };

  const removeProduct = (product) => {
    dispatch(removeProductFromCart({ product }));
  };

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);

  return (
    <Container>
      <Layout>
        <Wrapper>
          <Title>КОРЗИНА</Title>
          <Top>
            <NavLink to="/">
              <TopButton>ПРОДОЛЖИТЬ ПОКУПКИ</TopButton>
            </NavLink>
            <TopTexts>
              <TopText>Корзина (2)</TopText>
              <TopText>Желаемые (0)</TopText>
            </TopTexts>
            <TopButton type="filled">ОПЛАТИТЬ</TopButton>
          </Top>
          <Bottom>
            <Info>
              {products.map((p) => {
                return (
                  <>
                    <Product>
                      <ProductDetail>
                        <Image src={p.img} />
                        <Details>
                          <ProductName>
                            <b>Продукт:</b> {p.name}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {p._id}
                          </ProductId>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add onClick={() => addProduct(p)} />
                          <ProductAmount>{p.count}</ProductAmount>
                          <Remove onClick={() => removeProduct(p)} />
                        </ProductAmountContainer>
                        <ProductPrice>{p.price}</ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </>
                );
              })}
            </Info>
            <Summary>
              <SummaryTitle>ВАШИ ПОКУПКИ</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Цена покупок</SummaryItemText>
                <SummaryItemPrice>{totalPrice}сом</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Доставка</SummaryItemText>
                <SummaryItemPrice>{totalPrice > 500 ? 0 :150}сом</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Скидка на доставку</SummaryItemText>
                <SummaryItemPrice>{totalPrice < 500 ? 0 : -150}сом</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Общий</SummaryItemText>
                <SummaryItemPrice>{totalPrice > 500
                 ? totalPrice
                 : totalPrice === 0
                 ? 0
                 : totalPrice + 150}сом</SummaryItemPrice>
              </SummaryItem>
              <Button>Купить</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default Cart;
