import { useState } from "react";

const Contact = ({ setShowContact }) => {
  const [animate, setAnimate] = useState(false);

  function closeAnimation() {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setShowContact(false);
    }, 400);
  }

  return (
    <div className="contact-container">
      <div
        className={
          animate
            ? "modalCloseAnimation contact-info"
            : "modalOpenAnimation contact-info"
        }
      >
        <span className="close-modal" onClick={() => closeAnimation()}>
          {" "}
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
        <div>
          <a rel="noreferrer" href="mailto:robertas.cvetinskis@gmail.com">
            <span>Send me email</span> <i className="fa-solid fa-envelope"></i>
          </a>
          <a rel="noreferrer" href="tel:+37064788389">
            <span>Call me</span>
            <i className="fa-solid fa-phone"></i>
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100010005876126"
          >
            <span>Contact me on facebook</span>
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
