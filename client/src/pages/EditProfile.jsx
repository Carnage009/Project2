import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { editUserData } from "../redux/authSlice";

const Container = styled.div``;

const UserDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 60px);
`;

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

function EditProfile() {
  const user = useSelector((s) => s.auth.user);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleLoadImage = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleClick = async () => {
    const newFileName = Date.now() + avatar.name;
    const file = new File([avatar], newFileName, { type: avatar.type });
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:8888/api/upload", formData);
      const editData = {
        id: user._id,
        avatar: file.name,
      };
      const newUserData = await axios.put(
        "http://localhost:8888/api/users/edit",
        editData
      );
      dispatch(editUserData({ user: newUserData.data }));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <Container>
      <Navbar />
      <UserDataWrapper>
        <LogoBlock>
          {!user.avatar ? (
            <PersonIcon sx={{ fontSize: "100px" }} />
          ) : (
            <Image src={`http://localhost:8888/` + user.avatar} />
          )}
          <TextField
            type="file"
            onChange={handleLoadImage}
            name="avatar"
            // value={avatar}
          />
        </LogoBlock>
        <Button
          variant="outlined"
          disabled={!avatar}
          onClick={() => {
            handleClick();
          }}
        >
          Редактировать
        </Button>
      </UserDataWrapper>
    </Container>
  );
}

export default EditProfile;
