import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ id, selected, onChange }) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={(date) => onChange(date)}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default DatePicker;
