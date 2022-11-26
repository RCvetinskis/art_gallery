import React from "react";

const BurgerMenu = ({ showBurger, setShowBurger }) => {
  return (
    <div className="mobile-nav">
      <div
        onClick={() => setShowBurger(!showBurger)}
        className={showBurger ? " burger open" : "burger"}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showBurger && (
        <div className="drop-down-nav">
          <li>
            Galerija{" "}
            <span>
              <i className="fa-solid fa-images"></i>
            </span>{" "}
          </li>

          <li>
            Susisiekti{" "}
            <span>
              <i className="fa-solid fa-address-card"></i>
            </span>
          </li>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
