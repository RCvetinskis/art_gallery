import React from "react";
import { Form } from "react-bootstrap";
const InputText = ({ label, setValue, value }) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <Form.Control
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputText;
