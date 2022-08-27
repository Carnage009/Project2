import React from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccessibleIcon from "@mui/icons-material/Accessible";
import StoreIcon from "@mui/icons-material/Store";
import styled from "styled-components";
import "./Sidebar.css";

const SidebarWrapper = styled.aside`
  width: 30%;
  height: calc(100vh - 65px);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  padding: 0 20px;
  background-color: #ccd6df;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <h3>Статистика</h3>
      <div className="menu-list">
        <p className="menu-item">
          <AssessmentIcon></AssessmentIcon>
          Статистика магазина
        </p>
        <p className="menu-item">
          <AccessibleIcon></AccessibleIcon>
          Статистика пользователей
        </p>
        <p className="menu-item">
          <StoreIcon></StoreIcon>
          Статистика продаж
        </p>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
