import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const SelectInput = ({ label, options, value, setValue, isMulti }) => {
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
        defaultValue={value}
        onChange={setValue}
      />
    </div>
  );
};

export default SelectInput;
