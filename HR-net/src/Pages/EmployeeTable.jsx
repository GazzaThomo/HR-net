import useStore from "../store/store";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeModal from "../Components/EmployeeModal";

const EmployeeTable = () => {
  const employees = useStore((state) => state.employees);
  const [search, setSearch] = useState(""); //state for name search
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const sortDate = (rowA, rowB, field) => {
    return new Date(rowA[field]) - new Date(rowB[field]);
  };

  //function for employee name search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
      sortFunction: (rowA, rowB) => sortDate(rowA, rowB, "startDate"),
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Date of Birth",
      selector: (row) => new Date(row.dateOfBirth).toLocaleDateString(),
      sortable: true,
      sortFunction: (rowA, rowB) => sortDate(rowA, rowB, "dateOfBirth"),
    },
    {
      name: "Street",
      selector: (row) => row.street,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "Zip Code",
      selector: (row) => row.zipCode,
      sortable: true,
    },
  ];

  const reformatDateToDDMMYYYY = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const data = employees
    .filter((item) => {
      //make everything lowercase to make case insensitive
      const searchLower = search.toLowerCase();

      // reformat date fields for search
      const startDateFormatted = reformatDateToDDMMYYYY(
        item.startDate
      ).toLowerCase();
      const dateOfBirthFormatted = reformatDateToDDMMYYYY(
        item.dateOfBirth
      ).toLowerCase();

      return (
        item.firstName.toLowerCase().includes(searchLower) ||
        item.lastName.toLowerCase().includes(searchLower) ||
        startDateFormatted.includes(searchLower) ||
        dateOfBirthFormatted.includes(searchLower) ||
        item.department.toLowerCase().includes(searchLower) ||
        item.street.toLowerCase().includes(searchLower) ||
        item.city.toLowerCase().includes(searchLower) ||
        item.state.toLowerCase().includes(searchLower) ||
        item.zipCode.toLowerCase().includes(searchLower)
      );
    })
    .map((item, index) => ({ ...item, key: index }));

  return (
    <div className="employee-table-container">
      <h1>Current Employees</h1>

      <label htmlFor="search">
        Search by first name:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <br />
      <br />
      {employees.length > 0 ? (
        <DataTable
          columns={columns}
          data={data}
          pagination
          onRowClicked={handleRowClick}
        />
      ) : (
        <p>No employees found.</p>
      )}
      <Link to="/" className="current-emp-btn">
        Home
      </Link>
      {modalOpen && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
