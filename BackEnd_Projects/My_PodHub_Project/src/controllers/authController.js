const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

const saltRounds = 10;

// helper: generate JWT token
const signToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

// =====================
// REGISTER
// =====================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "listener" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ ok: false, message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    // Save user
    await user.save();

    return res.status(201).json({
      ok: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("register error:", err);

    // Handle duplicate key error (MongoDB)
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({ ok: false, message: "Email already in use" });
    }

    return res.status(500).json({
      ok: false,
      message: "Registration failed",
      error: err.message,
    });
  }
};

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        ok: false,
        message: "Email and password are required",
      });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user){
      console.log("Invalid user");
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match){
      console.log("INVALID PASSWORD")
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }
    console.log("USer success login")
    return res.json({
      ok: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: signToken(user),
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =====================
// FORGOT PASSWORD
// =====================
exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    // ensure email is string
    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "Valid email is required" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"PodHub Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "PodHub Password Reset",
      html: `
        <p>Hello <b>${user.name}</b>,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      ok: true,
      message: "Reset password link sent to your email",
    });
  } catch (err) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =====================
// RESET PASSWORD
// =====================
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({
        ok: false,
        message: "Token and new password are required",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(400).json({ ok: false, message: "Invalid or expired token" });

    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();

    return res.status(200).json({ ok: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

// =====================
// GET CURRENT USER
// =====================
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("_id name email role createdAt updatedAt");
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    return res.json({ ok: true, user });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
