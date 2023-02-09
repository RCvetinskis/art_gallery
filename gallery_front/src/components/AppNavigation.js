import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import BurgerMenu from "./BurgerMenu";
import { useNavigate } from "react-router-dom";
const AppNavigation = ({
  showContact,
  setShowContact,
  admin,
  setAdmin,
  setLoading,
}) => {
  const [showBurger, setShowBurger] = useState(false);
  const nav = useNavigate();

  const destroySession = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:4000/admin-logout", { withCredentials: true })
      .then((response) => {
        if (!response.data.error) {
          setAdmin(null);
          nav("/");
        } else alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    setLoading(false);
  };

  const openLogin = (e) => {
    if (!admin && e.detail == 3) {
      nav("/login");
    } else if (e.detail == 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      nav("/");
    }
  };

  const scrollToBottom = () => {
    if (admin) {
      nav("/");
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="navigation d-flex align-center jst-btw ">
      <li className="logo-container" onClick={openLogin}>
        {" "}
        <img src={logo} alt="" />
      </li>
      {/* navigation */}
      {admin ? (
        <div className="nav">
          <li onClick={scrollToBottom}>
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

          <li onClick={() => nav("/upload")}>
            Įkelti
            <span>
              <i className="fa-solid fa-upload"></i>
            </span>
          </li>
          <li onClick={() => nav("/admin")}>
            Admin Panel
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
          </li>

          <li onClick={() => destroySession()}>
            Atsijungti
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
          </li>
        </div>
      ) : (
        <div className="nav">
          <li onClick={scrollToBottom}>
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
      )}

      <BurgerMenu showBurger={showBurger} setShowBurger={setShowBurger} />
    </div>
  );
};

export default AppNavigation;
