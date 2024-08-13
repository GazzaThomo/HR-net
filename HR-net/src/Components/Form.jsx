import { useState } from "react";
import DatePicker from "./DatePicker";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { states } from "../formData/states";
import { departments } from "../formData/departments";
import CreateDropdown from "custom-react-dropdown-hrnet";
import { nanoid } from "nanoid";

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
    employeeId: nanoid(),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const addEmployee = useStore((state) => state.addEmployee);

  //for firstname, lastname, address, zipcode, city
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  //for date change
  const handleDateChange = (id, date) => {
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toISOString().split("T")[0];
    console.log(formattedDate);
    setFormData({ ...formData, [id]: formattedDate });
  };

  //all dropdown changes
  const handleDropdownChange = (id, selectedOption) => {
    setFormData({ ...formData, [id]: selectedOption.value });
  };

  //on validate form button
  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData); //add employee to store
    setModalOpen(true); //opens modal
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <DatePicker
          id="dateOfBirth"
          selected={formData.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date)}
          required
        />

        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          id="startDate"
          selected={formData.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          required
        />

        <fieldset className="address">
          <legend>Address</legend>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            value={formData.street}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="state">State</label>

          <CreateDropdown
            dropdownId="state"
            optionsArray={states}
            onChange={(option) => handleDropdownChange("state", option)}
            required
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="number"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </fieldset>

        <label htmlFor="department">Department</label>

        <CreateDropdown
          dropdownId="department"
          optionsArray={departments}
          onChange={(option) => handleDropdownChange("department", option)}
          required
        />
        <button className="submit-btn" type="submit">
          Save
        </button>
      </form>
      <div className="buttons-container">
        <Link to="/employee-list" className="current-emp-btn">
          View Current Employees
        </Link>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!
      </Modal>
    </div>
  );
};

export default Form;
