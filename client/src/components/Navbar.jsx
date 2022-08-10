import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Button } from "@mui/material"
import { Logout } from "../context/Actions";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { user, dispatch } = useContext(Context);

  const logout = () => {
    dispatch(Logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>RU</Language>
          <SearchContainer>
            <Input placeholder="Поиск" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <img
              height={60}
              src={process.env.PUBLIC_URL + "/images/logo.png"}
            />
          </Logo>
        </Center>
        <Right>
          {user ? (
            <>
            <h5>Сколько лет сколько зим {user.name}</h5>
            <Button variant="error" onClick={logout}>Выйти из аккаунта</Button>
            </>
          ) : (
            <>
              <NavLink to="/register" style={{ textDecoration: "none" }}>
                <MenuItem>ЗАРЕГИСТРИРОВАТЬСЯ</MenuItem>
              </NavLink>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <MenuItem>ЛОГИН</MenuItem>
              </NavLink>
            </>
          )}

          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;