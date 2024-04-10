import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aqi from "./components/Aqi";
import Chart from "./components/Chart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aqi" element={<Aqi />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
