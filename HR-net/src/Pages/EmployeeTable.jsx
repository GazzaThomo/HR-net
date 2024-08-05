import React, { useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  useSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import useStore from "../store/store";

const EmployeeTable = () => {
  const theme = useTheme(getTheme());
  const employees = useStore((state) => state.employees);
  const [search, setSearch] = useState(""); //state for name search
  const [entriesPerPage, setEntriesPerPage] = useState(5); //state for entries per page
  const pageSizes = [5, 10, 25, 50, 100]; //for number of entires in dropdown

  //function for employee name search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //handles dropdown list for number of entries shown
  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    pagination.fns.onSetPage(0); //reset to the first page when changing entries per page. fns = pagination functions https://react-table-library.com/?path=/story/types-pagination--page
  };

  //format data for react-tables
  const data = {
    nodes: employees
      .filter((item) =>
        item.firstName.toLowerCase().includes(search.toLowerCase())
      )
      .map((item, index) => ({ ...item, key: index })),
  };

  //create pagination parameters
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: entriesPerPage, // Use the state for entries per page
    },
    onChange: onPaginationChange,
  });

  //Create sort functions for react-tables
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortToggleType: SortToggleType.AlternateWithReset,
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

  // needed for sort parameters
  function onSortChange(action, state) {
    // console.log(action, state);
    return null;
  }

  //needed for pagination parameters
  function onPaginationChange(action, state) {
    // console.log(action, state);
    return null;
  }

  //create columns for react-tables
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

      <label htmlFor="entries">
        Entries per page:&nbsp;
        <select
          id="entries"
          value={entriesPerPage}
          onChange={handleEntriesChange}
        >
          {pageSizes.map((size) => (
            <option value={size} key={`size-${size}`}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label htmlFor="search">
        Search by first name:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <br />

      {employees.length > 0 ? (
        <CompactTable
          columns={columns}
          data={data}
          theme={theme}
          sort={sort}
          pagination={pagination}
        />
      ) : (
        <p>No employees found.</p>
      )}
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span>
          Page:{" "}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
      <br />
      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeTable;
