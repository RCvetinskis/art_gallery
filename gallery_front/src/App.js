import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import PageTransition from "./components/PageTransition";
import IndexPage from "./pages/IndexPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import mainContext from "./context/MainContext";
import AppNavigation from "./components/AppNavigation";
import Contact from "./components/Contact";
import AdminPage from "./pages/AdminPage";
import LoadingBox from "./components/LoadingBox";

// todo onclick scroll animation, added galleryscreen, display 4x3x2x1 photos, on photo click open picture modal full screen and make swiper. Add to close contact modal on screen click

// after login navigate to upload page, write code so only admin can use upload, add autologin for admin user

// add admin panel, so admin could edit, delete, photos, change categories, titles, add input search to find photo easier, add filter, sort.
function App() {
  const [showContact, setShowContact] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  const values = {
    admin,
    setAdmin,
    loading,
    setLoading,
    requestError,
    setRequestError,
  };

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:4000/admin-session", { withCredentials: true })
        .then((response) => {
          if (response.data.error) {
            setRequestError(response.data.message);
          } else {
            setRequestError("");
            setAdmin(response.data.username);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    getSession();
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <mainContext.Provider value={values}>
        {showContact ? <Contact setShowContact={setShowContact} /> : <></>}
        <AppNavigation
          admin={admin}
          setAdmin={setAdmin}
          setLoading={setLoading}
          showContact={showContact}
          setShowContact={setShowContact}
        />
        {loading && <LoadingBox />}

        {admin ? (
          <Routes>
            <Route element={<PageTransition />}>
              <Route path="/" element={<IndexPage />}></Route>
              <Route path="/upload" element={<UploadPage />}></Route>
              <Route path="/admin" element={<AdminPage />}></Route>
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route element={<PageTransition />}>
              <Route path="/" element={<IndexPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </Route>
          </Routes>
        )}
      </mainContext.Provider>
    </div>
  );
}

export default App;