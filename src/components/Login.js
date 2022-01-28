import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import formSchema from "./loginFormSchema";
import axios from "axios";

const Login = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
  });
  const [disabled, setDisabled] = useState(true);

  const { push } = useHistory();

  const validateForm = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const handleChange = (e) => {
    validateForm([e.target.name], e.target.value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    // Axios call
    axios
      .post("http://localhost:5000/api/login", value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        push("/view");
      })
      .catch((err) => {
        console.log(err);
        setFormErrors({
          ...formErrors,
          loginError: "Incorrect Login Credentials",
        });
      });
  };

  useEffect(() => {
    formSchema.isValid(value).then((valid) => setDisabled(!valid));
  }, [value]);

  return (
    <ComponentContainer>
      <ModalContainer>
        <h1>Welcome to Blogger Pro</h1>
        <h2>Please enter your account information.</h2>
        <form onSubmit={submitLogin}>
          {formErrors.username ? <p id="error">{formErrors.username}</p> : null}
          <label>
            Username
            <input
              type="text"
              name="username"
              id="username"
              value={value.username}
              onChange={handleChange}
            />
          </label>
          {formErrors.password ? <p id="error">{formErrors.password}</p> : null}
          <label>
            Password
            <input
              type="text"
              name="password"
              id="password"
              value={value.password}
              onChange={handleChange}
            />
          </label>
          <button id="submit" disabled={disabled}>
            Login
          </button>
          {formErrors.loginError ? (
            <p id="error">{formErrors.loginError}</p>
          ) : null}
        </form>
      </ModalContainer>
    </ComponentContainer>
  );
};

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
  height: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ModalContainer = styled.div`
  width: 500px;
  background: white;
  padding: 2rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 1.5rem;
`;

const FormGroup = styled.form`
  padding: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 1rem 0;
  width: 100%;
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
`;
