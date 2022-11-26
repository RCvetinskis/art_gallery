import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Contact from "./components/Contact";
import react, { useState } from "react";

function App() {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className="App">
      <Navigation showContact={showContact} setShowContact={setShowContact} />
      <Header />
      {showContact ? <Contact setShowContact={setShowContact} /> : <></>}
    </div>
  );
}

export default App;
