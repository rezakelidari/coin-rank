import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Coin from "./pages/Coin";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin" element={<Coin />} />
        <Route path="/coin/:id" element={<Coin />} />
      </Routes>
    </div>
  );
}
