const Manager = require("../models/managerModel");
const Firm = require("../models/companiesModel");
const jwt = require("jsonwebtoken");

exports.addManager = async (req, res) => {
  try {
    const managerFind = await Manager.findOne({
      ownerId: req.body.ownerId,
      email: req.body.email,
    });
    if (managerFind) {
      return res.status(400).send({
        success: false,
        message: "manager is already exist",
      });
    }
    const manager = await Manager.create({
      ...req.body,
      idImages: req.files["idImage"] && req.files["idImage"].map((e) => e.path),
      profileImage:
        req.files["profileImage"] && req.files["profileImage"][0].path,
      token: jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      }),
    });
    const firm = await Firm.findOne({ ownerId: manager.ownerId });
    manager.firmId = firm._id;

    firm.managers.push(manager._id);
    await firm.save();
    await manager.save();
    res.status(200).send({
      success: true,
      message: "manager created successfully",
      manager: manager,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginManager = async (req, res) => {
  try {
    const manager = await Manager.findOne({ email: req.body.email });
    if (manager) {
      const managerData = await Manager.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select("+password");
      if (managerData) {
        return res.status(200).send({
          success: true,
          message: "Login successfully",
          manager: managerData,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Manager not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getManager = async (req, res) => {
  try {
    const manager = await Manager.find({ ownerId: req.params.ownerId });
    res.status(200).send({
      success: true,
      message: "Manager listing successfully",
      data: manager,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};
