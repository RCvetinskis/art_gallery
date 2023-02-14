import React, { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import CustomModal from "./CustomModal";
import DeletePhoto from "./DeletePhoto";
const Drawings = ({ images }) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [selectPhoto, setSelectPhoto] = useState({
    title: "",
    description: "",
    img: "",
    category: ["Animals", "Forest", "Nature"],
    artType: ["Canvas", "Drawings"],
  });
  const [openModal, setOpenModal] = useState(false);

  const openSliderPhoto = (index) => {
    setOpenSlider(true);
    setPhotoIndex(index);
  };

  const openEditPhoto = (photo) => {
    setSelectPhoto(photo);
    setOpenModal(true);
  };

  return (
    <div className="gallery-wrapper">
      {openModal && (
        <CustomModal
          setModal={setOpenModal}
          content="editPhoto"
          photoToEdit={selectPhoto}
        />
      )}
      <div className="gallery-content ">
        {images.map((image, index) => (
          <div
            onClick={() => openSliderPhoto(index)}
            className="image-card"
            key={image._id}
          >
            <div className="d-flex gap-2">
              <button
                className="btn btn-dark"
                onClick={() => openEditPhoto(image)}
              >
                Update Photo
              </button>
              <DeletePhoto photoToDelete={image._id} />
            </div>

            <p className="text-center">{image.title}</p>

            <img src={`data:image/jpeg;base64,${image.base64String}`} />
          </div>
        ))}
      </div>
      {openSlider && (
        <ImageSlider
          setOpenSlider={setOpenSlider}
          images={images}
          photoIndex={photoIndex}
        />
      )}
    </div>
  );
};

export default Drawings;
