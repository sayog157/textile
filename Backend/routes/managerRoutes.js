const express = require("express");

const { verifyOwnerToken } = require("../middelware/auth");
const {
  addManager,
  loginManager,
  getManager,
} = require("../controllers/managerControllers");
const upload = require("../middelware/fileUpload");
const Router = express.Router();

Router.post(
  "/",
  upload.fields([{ name: "idImage" }, { name: "profileImage" }]),
  verifyOwnerToken,
  addManager
);
Router.post("/login", loginManager);
Router.get("/:ownerId", verifyOwnerToken, getManager);

module.exports = Router;
