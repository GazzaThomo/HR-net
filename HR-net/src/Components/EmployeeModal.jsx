// Components/Modal.jsx
import React from "react";

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          <u>Employee Details</u>
        </h2>
        <p>
          <strong>First Name:</strong> {employee.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {employee.lastName}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(employee.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(employee.dateOfBirth).toLocaleDateString()}
        </p>
        <p>
          <strong>Street:</strong> {employee.street}
        </p>
        <p>
          <strong>City:</strong> {employee.city}
        </p>
        <p>
          <strong>State:</strong> {employee.state}
        </p>
        <p>
          <strong>Zip Code:</strong> {employee.zipCode}
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeModal;
