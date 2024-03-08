import React, { useEffect, useState } from "react";
import path from "../../path";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchGallery = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.get(`${path}/fetch-gallery`, config);
      setGallery(res.data.gallery);
    };

    fetchGallery();
  }, []);

  const deletePhoto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const res = await axios.delete(
        `${path}/delete-photo?photoId=${id}`,
        config
      );
      if (res.data.success === true) {
        alert(res.data.msg);
        window.location.reload();
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row gy-2 p-2">
      {gallery.length > 0 &&
        gallery.map((glry, index) => (
          <div key={index} className="col-4">
            <div className="position-relative">
              <div className="position-absolute end-0 top-10">
                <MoreHorizIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setMenuOpen(index)}
                />
                {index === menuOpen && (
                  <ul
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      listStyle: "none",
                      background: "white",
                      right: "2px",
                      padding: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => deletePhoto(glry.id)}
                    >
                      Delete
                    </li>
              
                  </ul>
                )}
              </div>
         
              <img className="img-fluid rounded" src={glry.image} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Gallery;
