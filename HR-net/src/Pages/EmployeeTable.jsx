import React, { useEffect, useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useTheme } from "@table-library/react-table-library/theme";

const EmployeeTable = () => {
  const theme = useTheme(getTheme());
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  //for fetching the data in localstorage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const data = {
    nodes: employees.filter((item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const columns = [
    { label: "First Name", renderCell: (item) => item.firstName },
    { label: "Last Name", renderCell: (item) => item.lastName },
    {
      label: "Start Date",
      renderCell: (item) => new Date(item.startDate).toLocaleDateString(),
    },
    { label: "Department", renderCell: (item) => item.department },
    {
      label: "Date of Birth",
      renderCell: (item) => new Date(item.dateOfBirth).toLocaleDateString(),
    },
    { label: "Street", renderCell: (item) => item.street },
    { label: "City", renderCell: (item) => item.city },
    { label: "State", renderCell: (item) => item.state },
    { label: "Zip Code", renderCell: (item) => item.zipCode },
  ];

  return (
    <div className="employee-table-container">
      <h1>Current Employees</h1>

      <label htmlFor="search">
        Search by first name:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <br />

      {employees.length > 0 ? (
        <CompactTable columns={columns} data={data} theme={theme} />
      ) : (
        <p>No employees found.</p>
      )}
      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeTable;
