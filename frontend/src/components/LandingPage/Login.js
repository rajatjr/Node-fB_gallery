import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import path from "../../path";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const stateChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${path}/login`, state);
      if (res.data.success === false) {
        alert(res.data.msg);
        return;
      }
      const decode = jwt_decode(res.data.token);
      const { user } = decode;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          username: user.username,
        })
      );
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row w-50">
        <form className="card" onSubmit={handleLogin}>
          <div className="card-body">
            <h3 className="text-center default-text py-3">
              <i className="fa fa-lock"></i> Login
            </h3>
            <div className="md-form">
              <i className="fa fa-envelope prefix grey-text"></i>
              <input
                type="text"
                name="username"
                placeholder="Your username"
                id="defaultForm-email"
                className="pl-2 form-control"
                onChange={stateChangeHandler}
                value={state.username}
              />
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                id="defaultForm-pass"
                className="pl-2 form-control"
                onChange={stateChangeHandler}
                value={state.password}
              />
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/signUp" className="default-text">
                Create new account
              </Link>
              <Link to="/forgotPassword" className="default-text">
                Forgot password?
              </Link>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-default waves-effect waves-light"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
