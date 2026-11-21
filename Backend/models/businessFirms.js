const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  adderess: {
    type: String,
  },
  gst: {
    type: String,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  city: {
    type: String,
  },
});

firmSchema.set("timestamps", true);

module.exports = mongoose.model("Business_Firm", firmSchema);
