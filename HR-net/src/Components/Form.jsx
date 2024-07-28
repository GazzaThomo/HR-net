import React, { useState } from "react";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const states = [
  { label: "Alabama", value: "AL" },
  { label: "Charente", value: "16" },
  { label: "Charente-martime", value: "17" },
  { label: "Rhone", value: "69" },
  { label: "Ain", value: "01" },
];

const departments = [
  { label: "Sales", value: "Sales" },
  { label: "Marketing", value: "Marketing" },
  { label: "Engineering", value: "Engineering" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Legal", value: "Legal" },
];

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (id, date) => {
    setFormData({ ...formData, [id]: date });
  };

  const handleDropdownChange = (id, selectedOption) => {
    setFormData({ ...formData, [id]: selectedOption.value });
  };

  const saveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));
    setModalOpen(true);
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form id="create-employee" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <DatePicker
          id="dateOfBirth"
          selected={formData.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date)}
        />

        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          id="startDate"
          selected={formData.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
        />

        <fieldset className="address">
          <legend>Address</legend>
          <label htmlFor="street">Street</label>
          <input id="street" value={formData.street} onChange={handleChange} />

          <label htmlFor="city">City</label>
          <input id="city" value={formData.city} onChange={handleChange} />

          <label htmlFor="state">State</label>
          <Dropdown
            id="state"
            options={states}
            onChange={(option) => handleDropdownChange("state", option)}
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="number"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <Dropdown
          id="department"
          options={departments}
          onChange={(option) => handleDropdownChange("department", option)}
        />
      </form>
      <button onClick={saveEmployee}>Save</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!
      </Modal>
      <Link to="/employee-list">View Current Employees</Link>
    </div>
  );
};

export default Form;
