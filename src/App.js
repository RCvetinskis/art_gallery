import Navigation from "./components/Navigation";
import HeaderScreen from "./screens/HeaderScreen";
import Contact from "./components/Contact";
import AboutMeScreen from "./screens/AboutMeScreen";
import { useState } from "react";

function App() {
  // todo onclick scroll animation, added galleryscreen, display 4x3x2x1 photos, on photo click open picture modal full screen and make swiper.
  const [showContact, setShowContact] = useState(false);
  return (
    <div className="App">
      <Navigation showContact={showContact} setShowContact={setShowContact} />
      <HeaderScreen />
      <AboutMeScreen />

      {showContact ? <Contact setShowContact={setShowContact} /> : <></>}
    </div>
  );
}

export default App;
