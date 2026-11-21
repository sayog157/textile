const express = require("express");

const { verifyOwnerToken } = require("../middelware/auth");

const upload = require("../middelware/fileUpload");
const { addWorker, loginWorker } = require("../controllers/workerController");
const Router = express.Router();

Router.post(
  "/",
  upload.fields([{ name: "idImage" }, { name: "profileImage" }]),
  verifyOwnerToken,
  addWorker
);
Router.post("/login", loginWorker);

module.exports = Router;
