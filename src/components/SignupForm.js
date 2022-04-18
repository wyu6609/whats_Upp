import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";

import { setValue } from "../redux/user";
function SignupForm() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  //create new username
  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "passwordconfirmation") {
      setPasswordConfirmation(e.target.value);
    }
  }

  //POST-CREATE REQUEST
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        passwordConfirmation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          localStorage.setItem("jwt_token", data.token);
          dispatch(setValue(data.user.data));
          /*navigate to login screen */
        } else {
          alert("Password/Username combination not found");
        }
      });
  }

  ///
  function validateForm() {
    return (
      username.length > 0 &&
      password.length > 0 &&
      passwordConfirmation.length > 0
    );
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
            value={username}
            placeholder="username"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={password}
            placeholder="password"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            name="passwordconfirmation"
            onChange={(e) => handleChange(e)}
            value={passwordConfirmation}
            placeholder="password confirmation"
          />
        </Form.Group>
        <Button
          className="button-login"
          block
          type="submit"
          disabled={!validateForm()}
        >
          Create Account
        </Button>
      </Form>

      {/* <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        
        <input
          className="mb-3"
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          value={username}
          placeholder="username"
        />
        <Form.Label>Password</Form.Label>
        <input
          className="mb-3"
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          value={password}
          placeholder="password"
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </form> */}
    </div>
  );
}

export default SignupForm;
