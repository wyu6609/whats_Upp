import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="Login">
      <h1>WhatsApp Clone </h1>
      {showLogin ? (
        <div>
          <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
          <hr />
          <p className="signup-footer">
            Don't have an account? &nbsp;
            <Button variant="success" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <SignupForm />
          <hr />
          <p>
            Already have an account? &nbsp;
            <Button
              variant="success"
              size="sm"
              onClick={() => setShowLogin(true)}
            >
              Log In
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
