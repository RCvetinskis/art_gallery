import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImageSlider = ({ images, setOpenSlider, photoIndex }) => {
  const sliderRef = useRef(1);
  const settings = {
    infinite: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    // on photIndex change sets slider index to open clicked photo
    setTimeout(() => {
      sliderRef.current.slickGoTo(photoIndex);
    }, 0);
  }, [photoIndex]);

  return (
    <div className="imgslider">
      <i onClick={() => setOpenSlider(false)} className="fa-solid fa-xmark"></i>
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image) => (
            <div className="slider-img-container" key={image._id}>
              <img src={`data:image/jpeg;base64,${image.base64String}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
