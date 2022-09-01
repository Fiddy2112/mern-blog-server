require("dotenv").config();
const User = require("../models/User");
const argon2 = require("argon2");
var jwt = require("jsonwebtoken");

class UserController {
  /**
   * @route POST api/auth/register
   * @desc Register user
   * @access Public
   */
  async register(req, res) {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }

    try {
      // Check for existing users
      const user = await User.findOne({ username });
      // username taken
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });

      // All good ---> hash password
      const hashPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashPassword,
      });
      // save User
      await newUser.save();

      //Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN
      );

      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }

  /**
   * @route POST api/auth/login
   * @desc Login user
   * @access Public
   */
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }
    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }

      // Username found
      // Verify password
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
      // All good ---> accessToken
      const accessToken = jwt.sign(
        {
          userId: user._id,
        },
        process.env.ACCESS_TOKEN
      );
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    } catch (e) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
}

module.exports = new UserController();
