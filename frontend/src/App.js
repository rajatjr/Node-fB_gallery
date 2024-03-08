import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LandingPage/Login";
import SignUp from "./components/LandingPage/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import HomePage from "./components/Homepage/HomePage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyOtp from "./components/ForgotPassword/VerifyOtp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/verifyOtp" element={<VerifyOtp />}></Route>
          <Route
            path="/home"
            element={
              <PrivateRoutes>
                <HomePage />
              </PrivateRoutes>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
