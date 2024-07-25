import React, { useEffect, useState } from "react";
import { Table } from "@table-library/react-table-library/table";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const columns = [
    { label: "First Name", renderCell: (item) => item.firstName },
    { label: "Last Name", renderCell: (item) => item.lastName },
    { label: "Start Date", renderCell: (item) => item.startDate },
    { label: "Department", renderCell: (item) => item.department },
    { label: "Date of Birth", renderCell: (item) => item.dateOfBirth },
    { label: "Street", renderCell: (item) => item.street },
    { label: "City", renderCell: (item) => item.city },
    { label: "State", renderCell: (item) => item.state },
    { label: "Zip Code", renderCell: (item) => item.zipCode },
  ];

  return (
    <div className="employee-table-container">
      <h1>Current Employees</h1>
      <Table columns={columns} data={{ nodes: employees }} />
      <a href="index.html">Home</a>
    </div>
  );
};

export default EmployeeTable;
