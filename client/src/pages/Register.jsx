import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const MyInput = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 15px;
`;

const register = (registerData) => {
  return axios.post(
    "http://localhost:8888/api/users/registration",
    registerData
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userBirthDay, setUserBirthDay] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerObj = {
      name,
      lastName,
      email,
      userBirthDay,
      password,
      confirmPassword,
    };
    register(registerObj)
      .then((data) => {
        toast.success(data.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>СОЗДАТЬ АККАУНТ</Title>
        <Form onSubmit={handleSubmit}>
          <MyInput
            placeholder="Введите ваше имя"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MyInput
            placeholder="Введите вашу фамилию"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <MyInput
            placeholder="Введите email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyInput
            placeholder="Введите вашу дату рождения"
            type="Date"
            required
            value={userBirthDay}
            onChange={(e) => setUserBirthDay(e.target.value)}
          />
          <FormControl
            sx={{ marginTop: 2.5, width: "98.6%" }}
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
                      handleClickShowPassword("password");
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
          <FormControl
            sx={{ marginTop: 2.5, width: "98.6%" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClickShowPassword("confirmPassword");
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Подтвердите пароль"
            />
          </FormControl>
          <Button>СОЗДАТЬ</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
