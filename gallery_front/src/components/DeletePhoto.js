import React, { useContext } from "react";
import axios from "axios";
import mainContext from "../context/MainContext";
const DeletePhoto = ({ photoToDelete }) => {
  const { images, setImages } = useContext(mainContext);
  const deletePhoto = async () => {
    await axios
      .delete(`http://localhost:4000/delete-image/${photoToDelete}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.message);
        } else {
          const index = images.findIndex(
            (image) => image._id === photoToDelete
          );

          if (index !== -1) {
            const removeFromArray = images.splice(0, index);
            setImages(removeFromArray);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <button onClick={deletePhoto} className="btn btn-danger">
      Delete Photo
    </button>
  );
};

export default DeletePhoto;
