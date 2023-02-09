import React, { useState } from "react";
import ImageSlider from "../components/ImageSlider";

const Drawings = ({ images }) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);

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
