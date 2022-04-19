import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="Login">
      <h1 className="text_shadows">
        WhatsUpp
        <span className="logo-icon heartbeat">
          <Avatar src="/whatsapp_icon.png" alt="whatsapp-logo" />
        </span>
      </h1>
      {showLogin ? (
        <div>
          <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
          <hr />
          <p className="signup-footer">
            Don't have an account? &nbsp;
            <Button
              size="sm"
              variant="success"
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <SignupForm showLogin={showLogin} setShowLogin={setShowLogin} />
          <hr />
          <p>
            Already have an account? &nbsp;
            <Button
              className="btn-sm"
              size="sm"
              variant="success"
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
