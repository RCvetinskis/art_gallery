import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { InputGroup, Container } from "react-bootstrap";
import InputText from "../components/inputs/InputText";

import { useContext } from "react";
import mainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { setAdmin, setLoading, requestError, setRequestError } =
    useContext(mainContext);
  const nav = useNavigate();
  const firstRender = useRef(true);

  //  variable to check if everything is filled
  const errorsKeys = Object.keys(errors);

  const login = async () => {
    setLoading(true);
    await axios
      .post(
        "http://localhost:4000/admin-login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.error) {
          setRequestError(response.data.message);
          setLoading(false);
        } else {
          setRequestError("");
          setAdmin(response.data.username);
          setLoading(false);
          nav("/admin");
        }
      })
      .catch((error) => setRequestError(error.response.data.message));
    setLoading(false);
  };

  const validateInput = () => {
    let newErrors = {};

    if (!username) {
      newErrors.username = "Please provide username";
    }
    if (!password) {
      newErrors.password = "Please provide password";
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    //  skip validation on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    validateInput();
  }, [username, password]);
  return (
    <Container>
      <h1 className="text-center">Login</h1>
      <InputGroup className="row flex-column align-items-center gap-3">
        <InputText
          label="Username"
          setValue={setusername}
          error={errors.username}
        />
        <InputText
          label="Password"
          setValue={setPassword}
          error={errors.password}
        />
        <div className="col-md-6 ">
          <button
            onClick={login}
            className="btn btn-outline-secondary"
            type="button"
            disabled={errorsKeys.length === 0 ? false : true}
          >
            Login
          </button>
          <span className="error m-3">{requestError}</span>
        </div>
      </InputGroup>
    </Container>
  );
};

export default LoginPage;
