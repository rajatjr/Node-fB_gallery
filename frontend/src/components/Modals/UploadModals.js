import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import path from "../../path";
import Alert from "react-bootstrap/Alert";

function UploadModals({ show, setShow }) {
  const [imgFile, setImgFile] = useState("");

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleUploadPic = async () => {
    try {
      if (imgFile) {
        const formData = new FormData();
        formData.append("image", imgFile);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const res = await axios.post(
          `${path}/create-gallery`,
          formData,
          config
        );
        if (res.data.success === true) {
          alert("Image uploaded successfully!");
          window.location.reload();
        }
      } else {
        alert("Please enter a valid file.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Upload your images here</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" onChange={handleFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUploadPic}>
          Upload
        </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModals;
