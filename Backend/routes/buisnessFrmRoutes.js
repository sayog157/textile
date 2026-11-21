const express = require("express");

const { verifyOwnerToken } = require("../middelware/auth");
const {
  addFirms,
  updateFirm,
} = require("../controllers/businessFirmController");
const Router = express.Router();

Router.post("/", verifyOwnerToken, addFirms);
Router.put("/:id", verifyOwnerToken, updateFirm);

module.exports = Router;
