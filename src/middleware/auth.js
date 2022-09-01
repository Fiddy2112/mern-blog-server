require("dotenv").config();
const jwt = require("jsonwebtoken");

// Trong Authorization:Bearer Access_token --> muon lay ra token chu khong phai Bearer -> req.header('Authorization').split(' ')[1]
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.userId = decoded.userId;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
