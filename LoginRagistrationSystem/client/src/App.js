import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ragister from "./pages/Ragister";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/ragister" element={<Ragister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
