// utils/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"PodHub Notifications" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("sendEmail error:", err);
  }
}

module.exports = { sendEmail };
