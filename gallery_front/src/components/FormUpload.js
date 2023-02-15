import React, { useState, useEffect, useRef } from "react";
import { InputGroup } from "react-bootstrap";
import InputUpload from "./inputs/InputUpload";
import SelectInput from "./inputs/SelectInput";
import InputText from "./inputs/InputText";
import TextareaInput from "./inputs/TextareaInput";
import { categoryOptions, artTypeOptions } from "../utilities/selectOptions";
const FormUpload = ({ stateValues, onSubmit, isEditing }) => {
  const [errors, setErrors] = useState({
    artType: "",
    category: "",
    description: "",
    img: "",
    title: "",
  });

  const firstRender = useRef(true);

  //  variable to check if everything is filled
  const errorsKeys = Object.keys(errors);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      stateValues.setImg(e.target.files[0]);
      stateValues.setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      e.target.value = null;
    }
  };

  const validateInput = () => {
    let newErrors = {};
    if (!stateValues.img) {
      newErrors.img = "Select image file";
    }
    if (stateValues.img) {
      if (!stateValues.img.type.includes("image")) {
        newErrors.img = "Only images are allowed";
      }
    }

    if (stateValues.category.length === 0) {
      newErrors.category = "Please select category";
    }

    if (!stateValues.title) {
      newErrors.title = "Provide title";
    } else if (stateValues.title.length < 2) {
      newErrors.title = "Title should have atleast 3 characters";
    }

    if (stateValues.artType.length === 0) {
      newErrors.artType = "Please select art type";
    }

    if (!stateValues.description) {
      newErrors.description = "Please provide some sort of description";
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    //  skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    validateInput();
  }, [
    stateValues.img,
    stateValues.category,
    stateValues.description,
    stateValues.artType,
    stateValues.title,
  ]);

  return (
    <InputGroup className="row g-3">
      {/* upload */}
      {isEditing ? (
        <></>
      ) : (
        <div className="col-md-6">
          <InputUpload
            value={stateValues.img}
            setValue={stateValues.setImg}
            setImagePreview={stateValues.setImagePreview}
            onImageChange={onImageChange}
          />
        </div>
      )}

      {/* category */}
      <div className="col-md-6">
        <SelectInput
          label="Category"
          value={stateValues.category}
          setValue={stateValues.setCategory}
          options={categoryOptions}
          isMulti={true}
        />
        <>
          {" "}
          {errors.category && <span className="error">{errors.category}</span>}
        </>
      </div>

      {/* art type */}
      <div className="col-md-6">
        <SelectInput
          label="Art Type"
          value={stateValues.artType}
          setValue={stateValues.setArtType}
          options={artTypeOptions}
          isMulti={true}
        />
        {errors.artType && <span className="error">{errors.artType}</span>}
      </div>

      {/* title */}
      <div className="col-md-6">
        {" "}
        <InputText label={"title"} setValue={stateValues.setTitle} />{" "}
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* description */}
      <div className="col-12">
        {" "}
        <TextareaInput setValue={stateValues.setDescription} />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="col-12">
        {isEditing ? (
          <button
            onClick={onSubmit}
            className="btn btn-outline-secondary"
            type="button"
          >
            Upload Photo
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="btn btn-outline-secondary"
            type="button"
            disabled={errorsKeys.length === 0 ? false : true}
          >
            Upload Photo
          </button>
        )}
      </div>
    </InputGroup>
  );
};

export default FormUpload;
