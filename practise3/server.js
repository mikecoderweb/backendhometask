import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }

  return value;
}

const PORT = process.env.PORT || 3000;
const GMAIL_USER = requireEnv("GMAIL_USER");
const GMAIL_PASS = requireEnv("GMAIL_PASS");
const MAIL_FROM = process.env.MAIL_FROM || GMAIL_USER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

async function sendWithLogging(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject,
    text,
    html,
  });

  const result = {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };

  console.log("MAIL RESULT:");
  console.log("messageId:", result.messageId);
  console.log("accepted:", result.accepted);
  console.log("rejected:", result.rejected);

  return result;
}

app.post("/send", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject) {
      return res.status(400).json({
        message: "to and subject are required",
      });
    }

    if (!text && !html) {
      return res.status(400).json({
        message: "At least text or html must be provided",
      });
    }

    const result = await sendWithLogging(to, subject, text, html);

    res.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error("ERROR:", error.message);

    // Gmail dagihatoliklarni tekshiradi
    if (error.responseCode === 535 || error.code === "EAUTH") {
      return res.status(500).json({
        message: "Gmail authentication failed",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});