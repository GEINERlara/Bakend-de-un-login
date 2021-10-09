const jwt = require("jsonwebtoken");

const varifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      error: "Accseso denegado",
    });
  }

  try {
    const verified = jwt.verify(token, "claveSecreta1");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "El token no es valido",
    });
  }
};
module.exports = varifyToken;
// https://http.cat/
