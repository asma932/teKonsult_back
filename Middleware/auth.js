const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var token = req.body.token
  if(token===undefined){
    token= req.headers.authorization;
  }
  console.log("token: ****************** :",token)
  if (!token) return res.status(401).json({ message: "Authentication Failed", status: 'Failure' });

  try {
    const val = jwt.verify(token, "anystring");
    req.user = val;
    next();
  } catch (e) {
    res.status(500).send({ message: "Token Invalid", status: 'Failure' });
  }
};