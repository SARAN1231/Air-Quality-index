import "./css/map.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const Live = () => {
  const [sensorData, setSensorData] = useState({});
  const [markers, setMarkers] = useState([]);
  const zoom = 10;

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
              setSensorData(snapshot.val());
            } else {
              setSensorData({});
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

  useEffect(() => {
    const newMarkers = [];
    for (const key in sensorData) {
      if (sensorData.hasOwnProperty(key)) {
        const data = sensorData[key];
        const { Latitude, Longitude, Address } = data.Location;
        newMarkers.push({ position: [Latitude, Longitude], address: Address });
      }
    }
    setMarkers(newMarkers);
  }, [sensorData]);

  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "93.5vh" }}
        center={[13.082, 80.27]} // Default to Chennai, India if no sensor data is available
        zoom={zoom}
      >
        <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=PMFhUkfGpOK4cD0UwDGt" />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Live;
