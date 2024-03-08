const {Sequelize} = require("sequelize");
const sequelize = require("../config/db");
const User = require("./db.user");

const Gallery = sequelize.define("rajatlive_gallery", {
    image : {
        type : Sequelize.STRING,
        allowNull : false
    },
    userId : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});


User.hasMany(Gallery, {
    foreignKey : "userId",
    as : "gallery"
});


Gallery.belongsTo(User, {
    foreignKey : "userId",
    as : "user"
})

module.exports = Gallery;