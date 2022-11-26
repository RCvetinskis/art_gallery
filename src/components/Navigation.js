import React from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import BurgerMenu from "./BurgerMenu";
const Navigation = ({ showContact, setShowContact }) => {
  const [showBurger, setShowBurger] = useState(false);

  return (
    <div className="navigation d-flex align-center jst-btw">
      <li className="logo-container">
        {" "}
        <img src={logo} alt="" />
      </li>
      {/* navigation */}
      <div className="nav">
        <li>
          Galerija
          <span>
            <i className="fa-solid fa-images"></i>
          </span>
        </li>

        <li onClick={() => setShowContact(!showContact)}>
          Susisiekti
          <span>
            <i className="fa-solid fa-address-card"></i>
          </span>
        </li>
      </div>
      <BurgerMenu showBurger={showBurger} setShowBurger={setShowBurger} />
    </div>
  );
};

export default Navigation;
