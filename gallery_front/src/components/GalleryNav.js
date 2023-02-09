import React from "react";

const GalleryNav = ({ setShowGallery }) => {
  return (
    <ul className="gallery-nav d-flex justify-content-start gap-5  m-3">
      <li onClick={() => setShowGallery("Drawings")}>Piesiniai</li>
      <li onClick={() => setShowGallery("Canvases")}>Drobes</li>
    </ul>
  );
};

export default GalleryNav;
