const Gallery = require("../models/db.gallery");
const { Op } = require("sequelize");

exports.createGallery = async (req, res) => {
  try {
    const path = "http://localhost:3800";
    const imagePath = req.file.path.replace(/\\/g, "/");
    const newGallery = await Gallery.create({
      userId: req.user.id,
      image: `${path}/${imagePath}`,
    });
    if (newGallery) {
      return res.status(200).json({ success: true, gallery: newGallery });
    } else {
      return res.status(200).json({ success: true, msg: "Image didn't save." });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

exports.fetchGallery = async (req, res) => {
  try {
    const findGallery = await Gallery.findAll({
      where: { userId: req.user.id },
    });
    if (findGallery) {
      return res.status(200).json({ success: true, gallery: findGallery });
    } else {
      return res.status(200).json({ success: true, msg: "No records found." });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

exports.deletePhoto = async (req, res) => {
  const { photoId } = req.query;
  try {
    const delPhoto = await Gallery.destroy({
      where: { [Op.and]: [{ id: photoId }, { userId: req.user.id }] },
    });
    if (delPhoto) {
      return res
        .status(200)
        .json({ success: true, msg: "Photo deleted successfully!" });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "Photo didn't deleted!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
