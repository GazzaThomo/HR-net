import React, { useEffect, useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";

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

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        FirstName: (array) =>
          array.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        LastName: (array) =>
          array.sort((a, b) => a.lastName.localeCompare(b.lastName)),
        StartDate: (array) =>
          array.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
        Department: (array) =>
          array.sort((a, b) => a.department.localeCompare(b.department)),
        DoB: (array) =>
          array.sort(
            (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
          ),
        Street: (array) =>
          array.sort((a, b) => a.street.localeCompare(b.street)),
        City: (array) => array.sort((a, b) => a.city.localeCompare(b.city)),
        State: (array) => array.sort((a, b) => a.state.localeCompare(b.state)),
        ZipCode: (array) =>
          array.sort((a, b) => a.zipCode.localeCompare(b.zipCode)),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const columns = [
    {
      label: "First Name",
      renderCell: (item) => item.firstName,
      sort: { sortKey: "FirstName" },
    },
    {
      label: "Last Name",
      renderCell: (item) => item.lastName,
      sort: { sortKey: "LastName" },
    },
    {
      label: "Start Date",
      renderCell: (item) => new Date(item.startDate).toLocaleDateString(),
      sort: { sortKey: "StartDate" },
    },
    {
      label: "Department",
      renderCell: (item) => item.department,
      sort: { sortKey: "Department" },
    },
    {
      label: "Date of Birth",
      renderCell: (item) => new Date(item.dateOfBirth).toLocaleDateString(),
      sort: { sortKey: "DoB" },
    },
    {
      label: "Street",
      renderCell: (item) => item.street,
      sort: { sortKey: "Street" },
    },
    {
      label: "City",
      renderCell: (item) => item.city,
      sort: { sortKey: "City" },
    },
    {
      label: "State",
      renderCell: (item) => item.state,
      sort: { sortKey: "State" },
    },
    {
      label: "Zip Code",
      renderCell: (item) => item.zipCode,
      sort: { sortKey: "ZipCode" },
    },
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
        <CompactTable columns={columns} data={data} theme={theme} sort={sort} />
      ) : (
        <p>No employees found.</p>
      )}
      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeTable;
