import React from "react";
import Select from "react-select";

const Dropdown = ({ id, options, onChange }) => {
  return <Select options={options} onChange={onChange} />;
};

export default Dropdown;
