import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RootApp from "../components/RootApp.jsx";
import WebcamComponent from "../components/balances/balancing/tableOperations/videoRecCamera/WebcamComponent.jsx";



const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootApp/>} />
        <Route path="/camera" element={<WebcamComponent />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
