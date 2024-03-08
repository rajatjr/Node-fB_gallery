require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3800;

app.use("/", userRoutes);
app.use("/", galleryRoutes);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})