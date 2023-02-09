import React from "react";
import photos from "../data/photos";
import Introduction from "../components/Introduction";
import CanvasIntro from "../components/CanvasIntro";
import WallPortraitsIntro from "../components/WallPortraitsIntro";
import GalleryScreen from "./GalleryScreen";

const ContentContainer = () => {
  return (
    <div className="content-container">
      <Introduction bgPhoto={photos[0]} />
      <CanvasIntro bgPhoto={photos[1]} />
      <WallPortraitsIntro bgPhoto={photos[2]} />
      <GalleryScreen />
    </div>
  );
};

export default ContentContainer;
