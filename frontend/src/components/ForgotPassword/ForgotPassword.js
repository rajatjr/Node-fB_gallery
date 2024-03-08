import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import path from "../../path";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkEmail = await axios.get(
        `${path}/check-email-existence?email=${email}`
      );
      if (checkEmail.data.success === true) {
        const res = await axios.post(`${path}/send-otp`, { email: email });
        if(res.data.success === false) {
          alert(res.data.msg);
          return;
        }
        localStorage.setItem("otp", res.data.otp);
        navigate("/verifyOtp")
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="w-50 border px-5 py-4 rounded">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
