import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RootApp from "../components/RootApp.jsx";

import ModalDashboardRec from "../components/balances/balancing/tableOperations/videoRecCamera/ModalDashboardRec.jsx";
import WebcamAndEditor from "../components/balances/balancing/tableOperations/videoRecCamera/WebcamAndEditor.jsx";



const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootApp/>} />
        <Route path="/camera" element={<WebcamAndEditor />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
