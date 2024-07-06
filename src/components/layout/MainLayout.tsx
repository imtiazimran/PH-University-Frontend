import React from "react";
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import styled from "styled-components";

const { Header, Content } = Layout;

const StyledOutletDiv = styled.div`
  padding: 24px;
  min-height: 360px;
  border-radius: 10px;
  @media (max-width: 576px) {
    padding: 0px;
  }
`;
const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: "#001529" }}>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <StyledOutletDiv>
            <Outlet />
          </StyledOutletDiv>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
