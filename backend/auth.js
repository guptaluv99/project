const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //get the token from the header if present
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  token.startsWith(process.env.PUBLIC_KEY) ? token = token.slice(process.env.PUBLIC_KEY.length + 1, token.length) : token = token;
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    console.log("Invalid Token");
    res.status(400).send("Invalid token.");
  }
};