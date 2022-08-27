import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const Container = styled.div`
  width: 100vw;
  height:90vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const login = (loginData) => {
  return axios.post("http://localhost:8888/api/users/login", loginData);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginObj = {
      email,
      password,
    };
    login(loginObj)
      .then((data) => {
        // toast.success(data.data.message);
        dispatch(loginSuccess({ user: data.data.user }));
      })
      .catch((err) => {
        // toast.error(err.response.data.error);
        console.log(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>ВОЙТИ</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="login"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            sx={{ marginTop: 2, marginBottom: 2.5, width: "99.9%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClickShowPassword();
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Введите пароль"
            />
          </FormControl>
          <Button>ЛОГИН</Button>
          <Link>ЗАБЫЛИ ПАРОЛЬ?</Link>
          <Link>СОЗДАТЬ НОВЫЙ АККАУНТ</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
