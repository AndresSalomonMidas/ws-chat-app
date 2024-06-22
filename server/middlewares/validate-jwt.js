const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  // Client must send token in Headers with name 'x-token'
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "400 - Bad request - No token provided",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

    // Add uid to request
    req.uid = payload.uid;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      ok: false,
      msg: "401 - Unauthorized - Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
