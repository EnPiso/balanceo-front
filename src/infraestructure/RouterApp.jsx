import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootApp from "../components/RootApp.jsx";

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootApp/>} />
        <Route path="/orders/:orderId" element={<RootApp/>} />
        <Route path="/orders/:orderId/products/:productId" element={<RootApp/>} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
