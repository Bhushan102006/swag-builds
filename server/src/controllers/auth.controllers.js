const userModel = require("../models/user.model");

async function registerUser(req, res) {
  try {
    const { fullName, email, password, role, phone } = req.body;
    const userAlreadyExists = await userModel.findOne({
      email,
    });

    if (userAlreadyExists) {
      return res.status(409).json({
        message: "user is already registred with this email",
        status: "failed",
      });
    }
    const user = await userModel.create({
      fullName,
      email,
      password,
      role,
      phone,
    });

    const token = user.generateToken();

    user.password = undefined;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registred Sucessfully !",
      user,
      token: token,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function logInUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = user.generateToken();

    // Remove password before sending response
    user.password = undefined;

    // Send Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 Days
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
}

module.exports = { registerUser, logInUser };
