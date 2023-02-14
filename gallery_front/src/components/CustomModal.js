import React from "react";
import { useState } from "react";
import EmailInput from "./EmailInput";
import EditPhoto from "./EditPhoto";
const CustomModal = ({ setModal, content, photoToEdit }) => {
  const [animate, setAnimate] = useState(false);

  function closeAnimation() {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setModal(false);
    }, 300);
  }
  return (
    <div className="custom-modal">
      <div
        className={
          animate
            ? "modalCloseAnimation modal-container"
            : "modalOpenAnimation modal-container"
        }
      >
        <span className="close-modal" onClick={() => closeAnimation()}>
          {" "}
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
        <h1 className="text-center">Contact me</h1>
        <div className="modal-content p-3">
          {content === "contact" ? (
            <EmailInput />
          ) : (
            <EditPhoto photoToEdit={photoToEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
