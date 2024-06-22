const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Verify if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "404 - Not Found - Email not found",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "404 - Not found - Password incorrect",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    // Send response
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "500 - Internal Server Error",
    });
  }
};

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Verify if email exists
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "400 - Bad Request - Email already exists",
      });
    }

    // Create user
    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save in database
    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    // Send response
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "500 - Internal Server Error",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  // Middleware "validateJWT" attach the uid to the request
  const { uid } = req;

  // Generate new JWT
  const token = await generateJWT(uid);

  // Get user by uid
  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
};

module.exports = {
  login,
  createUser,
  revalidateToken,
};
