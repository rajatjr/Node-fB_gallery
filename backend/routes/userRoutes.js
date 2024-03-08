const { createUser, getUser, login, sendOtp, verifyOtp, forgotPassword, checkEmailExistence } = require("../controllers/userControllers");
const validateUser = require("../middlewares/validateUser");

const router = require("express").Router();

router.post("/create-account", validateUser, createUser);
router.post("/login", login);
router.get("/get-user/:userId", getUser);
router.get("/check-email-existence", checkEmailExistence);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.patch("/change-password", forgotPassword);
// router.patch("/edit-name");

module.exports = router;