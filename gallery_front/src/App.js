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

// after photo updated post or deleted write promise to await changes and redirect to main page
// figure out good design

function App() {
  const [showContact, setShowContact] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  // upload/edit states
  const [img, setImg] = useState("");
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [artType, setArtType] = useState([]);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const values = {
    admin,
    setAdmin,
    images,
    setImages,
    loading,
    setLoading,
    requestError,
    setRequestError,
    img,
    setImg,
    category,
    setCategory,
    title,
    setTitle,
    artType,
    setArtType,
    description,
    setDescription,
    imagePreview,
    setImagePreview,
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
        {showContact ? <Contact setModal={setShowContact} /> : <></>}
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
