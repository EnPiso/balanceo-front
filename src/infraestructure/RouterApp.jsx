import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RootApp from "../components/RootApp.jsx";

import ModalDashboardRec from "../components/balances/balancing/tableOperations/videoRecCamera/ModalDashboardRec.jsx";
import WebcamAndEditor from "../components/balances/balancing/tableOperations/videoRecCamera/WebcamAndEditor.jsx";
import WatchChrono from "../components/samples/WatchChrono.jsx";



const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootApp/>} />
        <Route path="/orders/:orderId" element={<RootApp/>} />
        <Route path="/orders/:orderId/products/:productId" element={<RootApp/>} />
        <Route path="/camera" element={<WebcamAndEditor />} />
        <Route path="/chrono" element={<WatchChrono />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
