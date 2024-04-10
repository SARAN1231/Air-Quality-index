import { Menu } from "antd";
import { WiDayCloudyGusts } from "react-icons/wi";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { IoBarChart } from "react-icons/io5";
import { TiWorldOutline } from "react-icons/ti";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      <div className="logo" style={{ textAlign: "center", padding: "20px 0" }}>
        <WiDayCloudyGusts />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        onClick={({ key }) => {
          if (key === "2") {
            // If the key is "1" (Map), navigate to the map page using useNavigate
            navigate("/aqi");
          } else if (key === "1") {
            // If the key is "1" (Map), navigate to the map page using useNavigate
            navigate("/");
          } else if (key === "3") {
            navigate("/chart");
          }
        }}
        items={[
          {
            key: "1",
            icon: <TiWorldOutline />,
            label: "Map",
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: "AQI",
          },
          {
            key: "3",
            icon: <IoBarChart />,
            label: "Charts",
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
