import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { Table } from "antd";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBLLNhV-p2i4lSv4IbLTJcFxP5PSKjjBk4",
      authDomain: "emii-cdc76.firebaseapp.com",
      databaseURL:
        "https://emii-cdc76-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "emii-cdc76",
      storageBucket: "emii-cdc76.appspot.com",
      messagingSenderId: "837995728498",
      appId: "1:837995728498:web:579a7d9da236ebbed93ceb",
      measurementId: "G-5C4QQHFQWF",
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, "sensorData");

    const getRealtimeData = () => {
      onValue(
        dbRef,
        (snapshot) => {
          try {
            if (snapshot && snapshot.exists()) {
              const data = snapshot.val();
              const sensorDataArray = Object.values(data).map((item, index) => {
                return {
                  ...item,
                  key: index, // Assigning index as key for Antd Table
                  timestamp: item.Timestamp,
                  location: item.Location ? item.Location.Address : "",
                  latitude: item.Location ? item.Location.Latitude : "",
                  longitude: item.Location ? item.Location.Longitude : "",
                  pm10: item.Measurements
                    ? item.Measurements.ParticleMatter.PM10
                    : "",
                  pm1_0: item.Measurements
                    ? item.Measurements.ParticleMatter.PM1_0
                    : "",
                  pm2_5: item.Measurements
                    ? item.Measurements.ParticleMatter.PM2_5
                    : "",
                };
              });
              setSensorData(sensorDataArray);
            } else {
              setSensorData([]);
            }
          } catch (error) {
            console.error("Error fetching sensor data:", error);
          }
        },
        (error) => {
          console.error("Error with Firebase onValue:", error);
        }
      );
    };

    getRealtimeData();

    return () => {
      onValue(dbRef, null);
    };
  }, []);

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },

    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "PM10",
      dataIndex: "pm10",
      key: "pm10",
    },
    {
      title: "PM1_0",
      dataIndex: "pm1_0",
      key: "pm1_0",
    },
    {
      title: "PM2_5",
      dataIndex: "pm2_5",
      key: "pm2_5",
    },
  ];

  return (
    <div className="container mt-3">
      <Table
        columns={columns}
        dataSource={sensorData}
        className="custom-table"
      />
    </div>
  );
};

export default SensorDataTable;
