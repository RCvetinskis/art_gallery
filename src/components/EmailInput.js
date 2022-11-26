import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import apiKeys from "../apiKeys";
import ErrorMsg from "../components/ErrorMsg";
const EmailInput = () => {
  // validation states
  const [isEmaillValid, setEmailVlid] = useState(false);
  const [emailError, setEmailVlidError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [isMessage, setIsMessage] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const telRef = useRef();
  const messageRef = useRef();
  // email regex
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const onSubmit = () => {
    if (isPhoneValid && isEmaillValid && isNameValid && isMessage) {
      const messageValues = {
        from_name: nameRef.current.value,
        message: messageRef.current.value,
        from_email: emailRef.current.value,
        from_phone: emailRef.current.value,
      };
      emailjs
        .send(
          apiKeys.SERVICE_ID,
          apiKeys.TEMPLATE_ID,
          messageValues,
          apiKeys.PUBLIC_KEY
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    } else {
      setGlobalError("Please fill all inputs");
    }
  };
  function validateEmail() {
    const email = emailRef.current.value;
    if (emailRegex.test(email)) {
      setEmailVlid(true);
      setEmailVlidError("");
    } else if (email.length <= 0) {
      setEmailVlid(false);
      setEmailVlidError("Email is required");
    } else {
      setEmailVlid(false);
      setEmailVlidError("Email is invalid");
    }
  }
  function validatePhone() {
    const tel = telRef.current.value;
    if (phoneRegex.test(tel)) {
      setIsPhoneValid(true);
      setPhoneError("");
    } else if (tel.length <= 0) {
      setIsPhoneValid(false);
      setPhoneError("Phone number is required");
    } else {
      setIsPhoneValid(false);
      setPhoneError("Invalid phone number");
    }
  }
  function validateName() {
    const name = nameRef.current.value;
    if (name.length <= 0) {
      setIsNameValid(false);
      setNameError("Name is required");
    } else {
      setIsNameValid(true);
      setNameError("");
    }
  }
  function validateMessage() {
    const message = messageRef.current.value;
    if (message.length <= 0) {
      setIsMessage(false);
      setMessageError("Message is empty");
    } else {
      setIsMessage(true);
      setMessageError("");
    }
  }
  return (
    <div className="email-inputs">
      <input
        onChange={validateName}
        ref={nameRef}
        type="text"
        placeholder="name"
        name="name"
      />
      <ErrorMsg error={nameError} />
      <input
        onChange={validateEmail}
        ref={emailRef}
        type="email"
        placeholder="email"
        name="email"
      />
      <ErrorMsg error={emailError} />
      <input
        onChange={validatePhone}
        ref={telRef}
        type="tel"
        placeholder="+370"
        name="phone"
      />
      <ErrorMsg error={phoneError} />
      <textarea
        onChange={validateMessage}
        ref={messageRef}
        placeholder="message"
        name="ref"
      ></textarea>
      <ErrorMsg error={messageError} />
      <button className="btn-msg" onClick={() => onSubmit()}>
        Send Message
      </button>
      <ErrorMsg error={globalError} />
    </div>
  );
};

export default EmailInput;
