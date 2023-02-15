import React, { useContext } from "react";
import FormUpload from "../components/FormUpload";
import { Container } from "react-bootstrap";
import mainContext from "../context/MainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  let stateValues;
  const {
    img,
    setImg,
    category,
    setCategory,
    artType,
    setArtType,
    title,
    setTitle,
    description,
    setDescription,
    imagePreview,
    setImagePreview,
  } = (stateValues = useContext(mainContext));

  const nav = useNavigate();

  const uploadPhoto = async () => {
    const catergoryValues = category.map((x) => x.value);
    const artTypeValues = artType.map((x) => x.value);
    const data = new FormData();
    data.append("image", img);
    data.append(
      "category",

      catergoryValues
    );
    data.append("title", title);
    data.append("artType", artTypeValues);
    data.append("description", description);

    await axios
      .post("http://localhost:4000/post-image", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.message);
        }

        nav("/");
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      <FormUpload
        isEditing={false}
        onSubmit={uploadPhoto}
        stateValues={stateValues}
      />

      {imagePreview.length >= 0 ? (
        <img
          style={{ width: 900 }}
          className="img-fluid rounded mx-auto d-block mt-3"
          src={imagePreview}
          alt={imagePreview}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default UploadPage;
