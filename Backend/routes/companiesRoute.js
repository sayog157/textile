const express = require("express");

const { verifyOwnerToken } = require("../middelware/auth");
const {
  addCompany,
  updateCompany,
  getCompany,
} = require("../controllers/companiesController");
const Router = express.Router();

Router.post("/", verifyOwnerToken, addCompany);
Router.put("/:id", verifyOwnerToken, updateCompany);
Router.get("/:id", verifyOwnerToken, getCompany);

module.exports = Router;
