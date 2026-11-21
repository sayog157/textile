const express = require("express");
const upload = require("../middelware/fileUpload");
const {
  loginWithGoogle,
  loginWithFacebook,
  loginWithApple,
  mobileLogin,
  verifyOtp,
  updateOwner,
} = require("../controllers/ownerController");
const { verifyOwnerToken } = require("../middelware/auth");
const Router = express.Router();

Router.post("/google_login", loginWithGoogle);
Router.post("/facebook_login", loginWithFacebook);
Router.post("/apple_login", loginWithApple);
Router.post("/otp_login", mobileLogin);
Router.post("/otp_verify", verifyOtp);
Router.put("/:id", upload.single("profileImage"), verifyOwnerToken, updateOwner);

module.exports = Router;
