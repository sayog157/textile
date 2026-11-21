const jwt = require("jsonwebtoken");

exports.verifyOwnerToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  const role = req.headers["userRole"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(644).send("Session time out");
  }

  return next();
};
