const Gallery = require("../models/db.gallery");
const User = require("../models/db.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

//creating user
exports.createUser = async (req, res) => {
  const { email, name, username, password } = req.body;
  try {
    const isUserExist = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (isUserExist) {
      return res.status(200).json({
        success: false,
        msg: "User already exists with mail id or username you entered.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPwd = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      email,
      name,
      username,
      password: hashPwd,
    });
    if (newUser) {
      return res
        .status(200)
        .json({ success: true, msg: "User created successfully." });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "Some error in creating user." });
    }
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

//logging in user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ where: { username } });
    const isMatchPwd = bcrypt.compareSync(password, findUser.password);
    if (isMatchPwd) {
      const token = jwt.sign({ user: findUser }, process.env.TOKEN_SECRET_KEY);
      return res.status(200).json({
        success: true,
        token,
      });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

//getting user by Id
exports.getUser = async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  try {
    const user = await User.findAll({
      include: [
        {
          model: Gallery,
          as: "gallery",
        },
      ],
      where: {
        id: userId,
      },
    });
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return res.status(200).json({ succerajatlive_galleryss: true, msg: "User didn't find." });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

//checking wether a user exists with this mail id or not
exports.checkEmailExistence = async (req, res) => {
  const { email } = req.query;
  try {
    const check = await User.findOne({ where: { email } });
    if (check) {
      return res
        .status(200)
        .json({ success: true, msg: "User exists with this mail id." });
    }
    return res
      .status(200)
      .json({ success: false, msg: "User does not exist with this mail id." });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

//sending otp to user
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    console.log("Generated otp: ", otp);
    const salt = bcrypt.genSaltSync(10);
    const hashOtp = bcrypt.hashSync(otp, salt);
    const token = jwt.sign({ otp: hashOtp }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1m",
    });
    return res.status(200).json({ success: true, otp: token });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

//verifying otp
exports.verifyOtp = async (req, res) => {
  const { otp, token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const isOtpMatch = bcrypt.compareSync(otp, decode.otp);
    if (isOtpMatch) {
      return res
        .status(200)
        .json({ success: true, msg: "OTP matched successfully." });
    } else {
      return res.status(200).json({ success: false, msg: "OTP didn't match." });
    }
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPwd = bcrypt.hashSync(newPassword, salt);
    const user = await User.update(
      { password: newPassword },
      { where: { email } }
    );
    if (user) {
      return res
        .status(200)
        .json({ success: true, msg: "Password changed successfully!" });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "Some error in changing password!" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};
