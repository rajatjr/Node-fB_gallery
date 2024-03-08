const sequelize = require("../config/db");
const {Sequelize} = require("sequelize");

const User = sequelize.define("rajatlive_user", {
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = User;