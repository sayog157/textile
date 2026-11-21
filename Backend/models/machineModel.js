const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business_Firm",
  },
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
  ],
});

machineSchema.set("timestamps", true);

module.exports = mongoose.model("machine", machineSchema);
