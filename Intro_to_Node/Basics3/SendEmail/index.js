// server.js
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mokamahesh77@gmail.com", 
    pass: "ulje xvbn pqsr ltoo",  
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

app.get("/test",async(req,res)=>{
	res.json({Message:"Node mailer is working!!!!!!!!"})
})
// ✅ route to send email
app.get("/sendemail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"NEM Student" <mokamahesh77@gmail.com>', // sender
      to: ["tlasmahesh178@gmail.com","mokamahesh77@gmail.com", "venugopal.burli@masaischool.com"], // recipients
      subject: "Testing Mail - NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    });

    res.json(`✅ Email sent successfully! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
