import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const SelectInput = ({ label, options, setValue, isMulti }) => {
  const animatedComponents = makeAnimated();

  return (
    <div>
      {label === "nolabel" ? (
        <></>
      ) : (
        <label className="form-label">{label}</label>
      )}

      <Select
        components={animatedComponents}
        isMulti={isMulti}
        options={options}
        onChange={setValue}
      />
    </div>
  );
};

export default SelectInput;
