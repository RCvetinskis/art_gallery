import React, { useState, useEffect, useRef } from "react";
import { InputGroup } from "react-bootstrap";
import axios from "axios";
import InputUpload from "./inputs/InputUpload";
import SelectInput from "./inputs/SelectInput";
import InputText from "./inputs/InputText";
import TextareaInput from "./inputs/TextareaInput";
import { useNavigate } from "react-router-dom";
import { categoryOptions, artTypeOptions } from "../utilities/selectOptions";
const FormUpload = ({ setImagePreview }) => {
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [artType, setArtType] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    artType: "",
    category: "",
    description: "",
    img: "",
    title: "",
  });

  const firstRender = useRef(true);
  const nav = useNavigate();

  //  variable to check if everything is filled
  const errorsKeys = Object.keys(errors);

  const uploadPhoto = async () => {
    const catergoryValues = category.map((x) => x.value);
    const artTypeValues = artType.map((x) => x.value);
    const data = new FormData();
    data.append("image", img);
    data.append(
      "category",

      catergoryValues
    );
    data.append("title", title);
    data.append("artType", artTypeValues);
    data.append("description", description);

    await axios
      .post("http://localhost:4000/post-image", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.message);
        }
      })
      .catch((error) => console.log(error));
    nav("/");
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      e.target.value = null;
    }
  };

  const validateInput = () => {
    let newErrors = {};
    if (!img) {
      newErrors.img = "Select image file";
    }
    if (img) {
      if (!img.type.includes("image")) {
        newErrors.img = "Only images are allowed";
      }
    }

    if (category.length === 0) {
      newErrors.category = "Please select category";
    }

    if (!title) {
      newErrors.title = "Provide title";
    } else if (title.length < 2) {
      newErrors.title = "Title should have atleast 3 characters";
    }

    if (artType.length === 0) {
      newErrors.artType = "Please select art type";
    }

    if (!description) {
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
  }, [img, category, description, artType, title]);

  return (
    <InputGroup className="row g-3">
      {/* upload */}
      <div className="col-md-6">
        <InputUpload
          value={img}
          setValue={setImg}
          setImagePreview={setImagePreview}
          onImageChange={onImageChange}
        />
      </div>

      {/* category */}
      <div className="col-md-6">
        <SelectInput
          label="Category"
          value={category}
          setValue={setCategory}
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
          value={artType}
          setValue={setArtType}
          options={artTypeOptions}
          isMulti={true}
        />
        {errors.artType && <span className="error">{errors.artType}</span>}
      </div>

      {/* title */}
      <div className="col-md-6">
        {" "}
        <InputText label={"title"} setValue={setTitle} />{" "}
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      {/* description */}
      <div className="col-12">
        {" "}
        <TextareaInput setValue={setDescription} />
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="col-12">
        <button
          onClick={uploadPhoto}
          className="btn btn-outline-secondary"
          type="button"
          disabled={errorsKeys.length === 0 ? false : true}
        >
          Upload Photo
        </button>
      </div>
    </InputGroup>
  );
};

export default FormUpload;
