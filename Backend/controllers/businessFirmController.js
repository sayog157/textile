const Firm = require("../models/businessFirms");

exports.addFirms = async (req, res) => {
  try {
    const firm = await Firm.create(req.body);
    res.status(200).send({
      success: true,
      message: "Firm created successfully",
      firm: firm,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.updateFirm = async (req, res) => {
  try {
    const firmFind = await Firm.findById(req.params.id)
    if(!firmFind){
      return res.status(400).send({
        success: false,
        message: "firm not found",
      });
    }
    const firm = await Firm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Firm updated successfully",
      firm: firm,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};
