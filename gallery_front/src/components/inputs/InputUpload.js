import React, { useRef } from "react";

const InputUpload = ({
  value,
  setValue,
  onImageChange,
  resetFileInput,
  setImagePreview,
}) => {
  const uploadRef = useRef();
  function resetFileInput() {
    uploadRef.current.value = null;
    setValue(null);
    setImagePreview("");
  }
  return (
    <div className="upload-input">
      <label className="form-label">Select Image</label>
      <input
        ref={uploadRef}
        type="file"
        className="form-control "
        accept="image/png, image/jpeg"
        onChange={onImageChange}
      />
      {value ? (
        <i className="fa-regular fa-circle-xmark" onClick={resetFileInput}></i>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputUpload;
