const Company = require("../models/companiesModel");

exports.addCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(200).send({
      success: true,
      message: "Company created successfully",
      company: company,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "ownerId managers workers firms"
    );
    res.status(200).send({
      success: true,
      message: "Company listing successfully",
      company: company,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const companyFind = await Company.findById(req.params.id);
    if (!companyFind) {
      return res.status(400).send({
        success: false,
        message: "compant not found",
      });
    }
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Company updated successfully",
      company: company,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};
