const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(req.body.token, "MY_SECRET");
    req.userData =  decodedToken;
    // { email: decodedToken.email, userId: decodedToken._id };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
}