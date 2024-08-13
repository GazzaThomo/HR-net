import useStore from "../store/store";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeModal from "../Components/EmployeeModal";
import jsonToCsvExport from "json-to-csv-export";

const EmployeeTable = () => {
  const employees = useStore((state) => state.employees);
  const removeEmployee = useStore((state) => state.removeEmployee);
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
    {
      // eslint-disable-next-line react/button-has-type
      cell: (row) => (
        <button
          className="delete-btn"
          key={row.employeeId}
          onClick={(e) => handleButtonClick(row, row.employeeId)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowoverflow: true,
      button: "true",
    },
  ];

  const handleButtonClick = (row, employeeId) => {
    if (employeeId === null) {
      return window.alert("please try again");
    }
    const canFindEmployee = employees.find(
      (obj) => obj.employeeId === employeeId
    );

    if (!canFindEmployee) {
      window.alert(
        `Sorry, we can't seem to find that employee in the database for some reason. Please contact the support.`
      );
    }

    const confirmationAnswer = confirm(
      `Are you sure you want to delete ${row.firstName} ${row.lastName} ?`
    );

    if (!confirmationAnswer) return window.alert(`Employee not deleted`);

    const newEmployeeList = employees.filter((obj) => {
      return obj.employeeId != employeeId;
    });
    removeEmployee(newEmployeeList);
    window.alert("Employee removed !");
  };
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
    .map((item) => ({ ...item, key: item.employeeId }));

  const dataToConvert = {
    data: data.map((item) => ({
      "First Name": item.firstName,
      "Last Name": item.lastName,
      "Start Date": item.startDate,
      Department: item.department,
      "Date of Birth": item.dateOfBirth,
      Street: item.street,
      City: item.city,
      State: item.state,
      "Zip code": item.zipCode,
    })),
    filename: "employees_table",
    delimiter: ",",
    headers: [
      "First Name",
      "Last Name",
      "Start Date",
      "Department",
      "Date of Birth",
      "Street",
      "City",
      "State",
      "Zip code",
    ],
  };

  return (
    <div className="employee-table-container">
      <h1>
        <u>Current Employees</u>
      </h1>

      <label htmlFor="search">
        Search :&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>

      <br />

      <button onClick={() => jsonToCsvExport(dataToConvert)}>
        Download Data
      </button>

      <br />
      {employees.length > 0 ? (
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
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
