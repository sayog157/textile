const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const workerSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  firmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business_Firm",
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  address: {
    type: String,
  },
  token: {
    type: String,
  },
  profileImage: {
    type: String,
  },

  salary: {
    type: Number,
  },

  idImages: {
    type: Array,
  },
  deviceToken: {
    type: String,
  },
  shift: {
    type: String,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

workerSchema.set("timestamps", true);

// JWT TOKEN
workerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Worker", workerSchema);
