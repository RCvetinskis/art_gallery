import React from "react";
import { Form } from "react-bootstrap";
const InputText = ({ label, setValue }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <Form.Control onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default InputText;
