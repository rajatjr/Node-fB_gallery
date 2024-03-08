import React, { useState } from "react";
import Gallery from "../Gallery/Gallery";
import UploadModals from "../Modals/UploadModals";
import Navbar from "../Navbar/Navbar";

function HomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div>
      <Navbar />
      <center>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowUploadModal(true)}
        >
          Upload Image
        </button>
      </center>
      <Gallery />
      {showUploadModal && (
        <UploadModals show={showUploadModal} setShow={setShowUploadModal} />
      )}
    </div>
  );
}

export default HomePage;
