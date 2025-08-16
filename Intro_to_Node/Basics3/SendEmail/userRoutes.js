const express = require("express");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure:true, // true for 465, false for other ports
  auth: {
    user: "mokamahesh77@gmail.com",
    pass: "ulje xvbn pqsr ltoo",
  }
});


const userRouter = express.Router();
userRouter.get("/sendEmail",async (req,res)=>{

  try {
    const info = await transporter.sendMail({
      from: '"Mahesh Moka" <mokamahesh77@gmail.com>', // ✅ your Gmail
      to: "tlasmahesh178@gmail.com, mokamahesh77@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent:", info.messageId);
    res.status(201).json({ Message: info.messageId });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.status(500).json({ error: err.message });
  }
})

module.exports = userRouter;


