import React, { useState } from "react";
import FormUpload from "../components/FormUpload";
import { Container } from "react-bootstrap";

const UploadPage = () => {
  const [imagePreview, setImagePreview] = useState("");
  return (
    <Container>
      <FormUpload img={imagePreview} setImagePreview={setImagePreview} />

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
