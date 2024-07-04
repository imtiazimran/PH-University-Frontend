import React from "react";
import { Button, Layout } from "antd";
import {  Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;



const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <Layout>
     <Sidebar/>
      <Layout>
        <Header  style={{ padding: 0, background: "#001529" }} >
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: 10,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
