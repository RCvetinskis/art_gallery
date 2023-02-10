import React, { useState, useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import axios from "axios";

const Drawings = ({ images }) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [id, setId] = useState("");

  console.log(id);

  const editPhoto = async () => {
    await axios
      .patch(`http://localhost:4000/edit-image/${id}`, {
        title: "Changed title",
        description: "Changed description",
        img: "",
        category: ["Animals", "Forest", "Nature"],
        artType: ["Canvas", "Drawings"],
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    editPhoto();
  }, [id]);

  const openSliderPhoto = (index) => {
    setOpenSlider(true);
    setPhotoIndex(index);
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery-content ">
        {images.map((image, index) => (
          <div
            onClick={() => openSliderPhoto(index)}
            className="image-card"
            key={image._id}
          >
            <button className="btn btn-dark" onClick={() => setId(image._id)}>
              Update Photo
            </button>
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
