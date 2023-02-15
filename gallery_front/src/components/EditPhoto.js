import React, { useContext } from "react";
import axios from "axios";
import FormUpload from "./FormUpload";
import mainContext from "../context/MainContext";

const EditPhoto = ({ photoToEdit, setModal }) => {
  let stateValues;
  const {
    img,
    setImg,
    category,
    setCategory,
    setImages,
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
      .then((response) => {
        if (response.data.error) {
          alert(response.data.message);
        } else {
          setImages((prevImages) => {
            const index = prevImages.findIndex(
              (photo) => photo._id === photoToEdit._id
            );
            if (index !== -1) {
              return [
                ...prevImages.slice(0, index),
                {
                  ...prevImages[index],
                  title,
                  description,
                  category:
                    category.length < 0 ? category.map((x) => x.value) : null,
                  artType:
                    artType.length < 0 ? artType.map((x) => x.value) : null,
                },
                ...prevImages.slice(index + 1),
              ];
            }
            return prevImages;
          });
          setModal(false);
        }
      })
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
