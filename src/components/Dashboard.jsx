import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Headers from "./Headers";
import Maplive from "./Maplive";
import { Button, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <Sidebar />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="header">
          <Flex justify="flex-start" align="center">
            <h1>MAP</h1>
          </Flex>
        </Header>
        <Content className="content">
          <Maplive />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
