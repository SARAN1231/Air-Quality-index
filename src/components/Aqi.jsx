import { Button, Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Gastable from "./Gastable";
import Headers from "./Headers";
import Maplive from "./Maplive";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Aqimanual from "./Aqimanual";
import SensorDataTable from "./Sensordata";

const Aqi = () => {
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
            <h1>AQI</h1>
          </Flex>
        </Header>
        <Content className="content">
          <SensorDataTable />
          <Gastable />
          <Aqimanual />
          <h1>
            National Air Quality Index <br />
            <br />
          </h1>
          <img
            src="src\components\airqualityindex.png"
            alt="monitoring"
            width="100%"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Aqi;
