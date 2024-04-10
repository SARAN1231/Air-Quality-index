import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

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
              const sensorDataArray = Object.entries(data).map(
                ([key, value], index) => ({
                  key: index + 1, // Using index + 1 as the serial number
                  timestamp: value.Timestamp,
                  CO: value.Measurements.Gases.CO.Concentration,
                  NO2: value.Measurements.Gases.NO2.Concentration,
                  Ozone: value.Measurements.Gases.Ozone.Concentration,
                  VOC: value.Measurements.Gases.VOC.Concentration,
                })
              );
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
      title: "CO (ppm)",
      dataIndex: "CO",
      key: "CO",
    },
    {
      title: "NO2 (ppm)",
      dataIndex: "NO2",
      key: "NO2",
    },
    {
      title: "Ozone (ppm)",
      dataIndex: "Ozone",
      key: "Ozone",
    },
    {
      title: "VOC (ppm)",
      dataIndex: "VOC",
      key: "VOC",
    },
  ];

  return (
    <div className="container mt-3">
      <h1>
        GAS MEASUREMENTS <br />
        <br />
      </h1>
      <Table columns={columns} dataSource={sensorData} />
    </div>
  );
};

export default SensorDataTable;
