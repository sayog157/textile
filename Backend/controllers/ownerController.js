const Owner = require("../models/ownerModel");
const jwt = require("jsonwebtoken");

const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.loginWithGoogle = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
      googleId,
      image,
      deviceToken,
    } = req.body;
    const ownerFind = await Owner.findOne({ email: email });
    if (ownerFind) {
      res.status(200).send({
        success: true,
        message: "Owner login successfully",
        owner: ownerFind,
      });
    } else {
      const ownerData = await Owner.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        image: image,
        googleId: googleId,
        deviceToken: deviceToken,
        isVerify: true,
        token: jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }),
      });

      res.status(200).send({
        success: true,
        message: "Owner created successfully",
        owner: ownerData,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginWithFacebook = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
      facebookId,
      image,
      deviceToken,
    } = req.body;
    const ownerFind = await Owner.findOne({ email: email });
    if (ownerFind) {
      res.status(200).send({
        success: true,
        message: "Owner login successfully",
        owner: ownerFind,
      });
    } else {
      const ownerData = await Owner.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        image: image,
        facebookId: facebookId,
        deviceToken: deviceToken,
        isVerify: true,
        token: jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }),
      });

      res.status(200).send({
        success: true,
        message: "Owner created successfully",
        owner: ownerData,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginWithApple = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
      appleId,
      image,
      deviceToken,
    } = req.body;
    const ownerFind = await Owner.findOne({ email: email });
    if (ownerFind) {
      res.status(200).send({
        success: true,
        message: "Owner login successfully",
        owner: ownerFind,
      });
    } else {
      const ownerData = await Owner.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        image: image,
        appleId: appleId,
        deviceToken: deviceToken,
        isVerify: true,
        token: jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }),
      });

      res.status(200).send({
        success: true,
        message: "Owner created successfully",
        owner: ownerData,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.mobileLogin = async (req, res) => {
  try {
    const data = await Owner.findOne({ mobileNo: req.body.mobileNo });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (!data) {
      await Owner.create({
        mobileNo: req.body.mobileNo,
        otp: otp,
        isVerify: false,
      });
    } else {
      data.otp = otp;
      await data.save();
    }

    client.messages
      .create({
        body: `Your login otp is ${otp}`,
        from: "+447782389238",
        to: req.body.mobileNo,
      })
      .then((message) => {
        res.status(200).json({
          success: true,
          message: `otp send successfully to ${req.body.mobileNo}`,
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        res.status(200).json({
          success: false,
          message: `something went wrong`,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const data = await Owner.findOne({ mobileNo: req.body.mobileNo });
    const date1 = new Date(data.updatedAt);
    const date2 = new Date();
    const timeDifference = date2.getTime() - date1.getTime();
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
    if (timeDifference < fiveMinutesInMilliseconds) {
      if (data.otp === req.body.otp) {
        data.isVerify = true;
        data.otp = null;
        data.token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        await data.save();
        res.status(200).json({
          success: true,
          data: data,
          message: `login successfully`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `invalid otp`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `otp expire`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const id = req.params.id;

    if (req.file) {
      const user = await Owner.findByIdAndUpdate(
        id,
        {
          image: req.file.path,
          ...req.body,
        },
        { new: true }
      );
      return res.status(200).json({
        data: user,
        message: "manager updated successfully",
        success: true,
      });
    }
    const user = await Owner.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: user,
      message: "manager updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};
