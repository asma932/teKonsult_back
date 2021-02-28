const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Authentication Failed", status: 'KO' });

  // const token = header.replace('Bearer ', '');
  try {
    const val = jwt.verify(token, "anystring");
    req.user = val;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Token Invalid", status: 'KO' });
  }
};