import React from "react";
import axios from "axios";
const DeletePhoto = ({ photoToDelete }) => {
  const deletePhoto = async () => {
    await axios
      .delete(`http://localhost:4000/delete-image/${photoToDelete}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <button onClick={deletePhoto} className="btn btn-danger">
      Delete Photo
    </button>
  );
};

export default DeletePhoto;
