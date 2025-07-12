require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async (to, message, subject) => {
  const recipients = Array.isArray(to) ? to.join(", ") : to;

  try {
    await transporter.sendMail({
      from: {
        name: "ORBIS TRADING AND SERVICES CENTER",
        address: process.env.EMAIL_USER,
      },
      to: recipients,
      subject: subject || "Notification from ORBIS",
      text: message,
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

// Updated SMS using POST
const sendSMS = async (to, message, callbackUrl = "") => {
  const API_URL = "https://api.afromessage.com/api/send";

  const payload = {
    from: process.env.IDENTIFIER_ID,
    sender: process.env.FROMESSAGE_SENDER_NAME,
    to,
    message,
    callback: callbackUrl,
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AFROMESSAGE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const { acknowledge, response: resData } = response.data;

    if (acknowledge === "success") {
      console.log("✅ SMS sent successfully!");
      console.log("Message ID:", resData.message_id);
      console.log("Status:", resData.status);
    } else {
      console.error("❌ Failed to send SMS:", response.data);
    }
  } catch (error) {
    console.error(
      "❌ Error sending SMS:",
      error.response?.data || error.message
    );
  }
};

module.exports = { sendEmail, sendSMS };
