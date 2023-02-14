import React from "react";
import { Form } from "react-bootstrap";
const TextareaInput = ({ setValue, value }) => {
  return (
    <div className="">
      <label className="form-label">Description</label>
      <Form.Control
        style={{ height: "100px" }}
        as="textarea"
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextareaInput;
