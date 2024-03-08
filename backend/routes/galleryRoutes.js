const upload = require("../config/multerConfig");
const { createGallery, fetchGallery, deletePhoto } = require("../controllers/galleryControllers");
const authMiddle = require("../middlewares/authMiddle");

const router = require("express").Router();

//creating gallery
router.post("/create-gallery", authMiddle, upload.single("image"), createGallery);

//fetching galleries of a user through user's id
router.get("/fetch-gallery", authMiddle, fetchGallery)

//deleting photo of a particular user
router.delete("/delete-photo", authMiddle, deletePhoto)

module.exports = router;
