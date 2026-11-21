const Worker = require("../models/workerModel");
const Firm = require("../models/companiesModel");
const jwt = require("jsonwebtoken");

exports.addWorker = async (req, res) => {
  try {
    const workerFind = await Worker.findOne({
      ownerId: req.body.ownerId,
      email: req.body.email,
    });
    if (workerFind) {
      return res.status(400).send({
        success: false,
        message: "worker is already exist",
      });
    }
    const worker = await Worker.create({
      ...req.body,
      idImages: req.files["idImage"] && req.files["idImage"].map((e) => e.path),
      profileImage:
        req.files["profileImage"] && req.files["profileImage"][0].path,
      token: jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      }),
    });
    const firm = await Firm.findOne({ ownerId: worker.ownerId });
    worker.firmId = firm._id;

    firm.workers.push(worker._id);
    await firm.save();
    await worker.save();
    res.status(200).send({
      success: true,
      message: "worker created successfully",
      worker: worker,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginWorker = async (req, res) => {
  try {
    const worker = await Worker.findOne({ email: req.body.email });
    if (worker) {
      const workerrData = await Worker.findOne({
        email: req.body.email,
        password: req.body.password,
      }).select("+password");
      if (workerrData) {
        return res.status(200).send({
          success: true,
          message: "Login successfully",
          worker: workerrData,
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
