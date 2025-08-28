const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "mysecret"); // use env in real projects
    req.user = decoded.user; // { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
