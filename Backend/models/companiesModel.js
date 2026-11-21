const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  adderess: {
    type: String,
  },
  ownerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
  ],
  gst: {
    type: String,
  },
  managers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
    },
  ],
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
  ],
  firms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business_Firm",
    },
  ],
  machines: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
});

companySchema.set("timestamps", true);

module.exports = mongoose.model("Company", companySchema);
