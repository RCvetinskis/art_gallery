import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import FormUpload from "./FormUpload";
import mainContext from "../context/MainContext";

const EditPhoto = ({ photoToEdit }) => {
  let stateValues;
  const {
    img,
    setImg,
    category,
    setCategory,
    artType,
    setArtType,
    title,
    setTitle,
    description,
    setDescription,
    imagePreview,
    setImagePreview,
  } = (stateValues = useContext(mainContext));

  const editPhoto = async () => {
    await axios
      .patch(`http://localhost:4000/edit-image/${photoToEdit._id}`, {
        title,
        description,
        category: category.length < 0 ? category.map((x) => x.value) : null,
        artType: artType.length < 0 ? artType.map((x) => x.value) : null,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="edit-photo-container">
      <FormUpload
        isEditing={true}
        onSubmit={editPhoto}
        stateValues={stateValues}
      />
    </div>
  );
};

export default EditPhoto;
