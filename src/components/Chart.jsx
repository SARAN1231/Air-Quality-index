import Sider from "antd/es/layout/Sider";
import Layout, { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Headers from "./Headers";
import Maplive from "./Maplive";
import { Button, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import AppWithErrorBoundary from "./Co";
import AppWithErrorBoundary_2 from "./No";
import AppWithErrorBoundary_3 from "./ozone ";
import AppWithErrorBoundary_4 from "./Voc ";
import "./chart.css";

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
            <h1>GRAPH</h1>
          </Flex>
        </Header>
        <Content className="content">
          <div className="chart">
            <h1>CO Concentration</h1>
            <AppWithErrorBoundary />
            <h1>Ozone Concentration</h1>
            <AppWithErrorBoundary_3 />
            <h1>NO2 Concentration</h1>
            <AppWithErrorBoundary_2 />
            <h1>VOC CONCENTRATION</h1>
          </div>
          <AppWithErrorBoundary_4></AppWithErrorBoundary_4>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
