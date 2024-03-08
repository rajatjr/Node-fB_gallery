import React, { useState } from "react";
import "../CSS/Login.css";
import axios from "axios";
import path from "../../../path";
import {useNavigate} from "react-router-dom"

function SignUp() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cnfPassword: "",
  });

  const handleFormChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, username, cnfPassword } = state;
      if (password !== cnfPassword) {
        alert("Password & confirm password didn't match.");
        return;
      }
      const res = await axios.post(`${path}/create-account`, {
        name,
        email,
        password,
        username,
      });
      if (res.data.success === false) {
       
        alert(res.data.msg);
        return;
      
      } else {
        alert("Account created successfully.");
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="card ripe-malinka-gradient form-white w-50">
        <div className="card-body">
          
          <form onSubmit={handleSignUpFormSubmit}>
            <h2 className="text-center font-up font-bold py-4 white-text">
              Sign up
            </h2>
            <div className="md-form">
              <i className="fa fa-user prefix white-text"></i>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                id="orangeForm-name2"
                className="form-control"
                onChange={handleFormChange}
                value={state.name}
              />
            </div>
            <div className="md-form">
              <i className="fa fa-envelope prefix white-text"></i>
              <input
                type="text"
                placeholder="Your email"
                name="email"
                id="orangeForm-email2"
                className="form-control"
                onChange={handleFormChange}
                value={state.email}
              />
            </div>
            <div className="md-form">
              <i className="fa fa-envelope prefix white-text"></i>
              <input
                type="text"
                placeholder="Your username"
                name="username"
                id="orangeForm-email2"
                className="form-control"
                onChange={handleFormChange}
                value={state.username}
              />
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix white-text"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="orangeForm-pass2"
                className="form-control"
                onChange={handleFormChange}
                value={state.password}
              />
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix white-text"></i>
              <input
                type="password"
                name="cnfPassword"
                placeholder="Confirm password"
                id="orangeForm-pass2"
                className="form-control"
                onChange={handleFormChange}
                value={state.cnfPassword}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-outline-white waves-effect waves-light">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
