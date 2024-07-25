import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import EmployeeTable from "./Pages/EmployeeTable.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeTable />} />
      </Routes>
    </Router>
  );
}

export default App;
