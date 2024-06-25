const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject(new Error("Could not generate JWT"));
        } else {
          resolve(token);
        }
      },
    );
  });
};

const verifyJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    return [true, uid];
  } catch (error) {
    console.error(error);
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
