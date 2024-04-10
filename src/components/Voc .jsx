import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(CategoryScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(LinearScale);

const firebaseConfig = {
  // Firebase configuration
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

function App() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "VOC Concentration (ppm)",
        data: [],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        tension: 0.4,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const sensorDataRef = ref(db, "sensorData");
    onValue(sensorDataRef, (snapshot) => {
      const sensorData = snapshot.val();
      if (!sensorData) {
        console.error("No data found in Firebase");
        return;
      }
      const timestamps = [];
      const vocConcentrations = [];
      for (const key in sensorData) {
        const data = sensorData[key];
        timestamps.push(data.Timestamp);
        vocConcentrations.push(
          data.Measurements?.Gases?.VOC?.Concentration || 0
        );
      }
      setData({
        ...data,
        labels: timestamps,
        datasets: [
          {
            ...data.datasets[0],
            data: vocConcentrations,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="App" style={{ width: "800px", height: "800px" }}>
      <Line
        data={data}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "VOC Concentration (ppm)",
              },
            },
          },
        }}
      />
    </div>
  );
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function AppWithErrorBoundary_4() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
