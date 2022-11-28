import React from "react";
import photos from "../data/photos";
import Introduction from "../components/Introduction";
import CanvasIntro from "../components/CanvasIntro";
import WallPortraitsIntro from "../components/WallPortraitsIntro";

const AboutMeScreen = () => {
  return (
    <div className="about-me-container">
      <Introduction bgPhoto={photos[0]} />
      <CanvasIntro bgPhoto={photos[1]} />
      <WallPortraitsIntro bgPhoto={photos[2]} />
    </div>
  );
};

export default AboutMeScreen;
