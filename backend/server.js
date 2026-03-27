const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const frontendUrl = process.env.FRONTEND_URL || "*";

app.use(
  cors({
    origin: frontendUrl === "*" ? true : frontendUrl
  })
);
app.use(express.json());

const buildTransporter = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    EMAIL_USER,
    EMAIL_PASS
  } = process.env;

  if (SMTP_HOST) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === "true",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePayload = ({ name, email, message }) => {
  if (!name || !email || !message) {
    return "All fields are required.";
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }

  if (!isValidEmail(email)) {
    return "Please provide a valid email address.";
  }

  if (message.trim().length < 10) {
    return "Message must be at least 10 characters long.";
  }

  return null;
};

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "portfolio-mailer-backend" });
});

app.post("/send-email", async (req, res) => {
  const { name = "", email = "", message = "" } = req.body || {};
  const validationError = validatePayload({ name, email, message });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO, SMTP_FROM } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    return res.status(500).json({
      message: "Email service is not configured. Add the required environment variables."
    });
  }

  try {
    const transporter = buildTransporter();

    await transporter.sendMail({
      from: SMTP_FROM || `"Kanak Portfolio" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email.trim(),
      subject: `New portfolio inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2>New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Message:</strong></p>
          <p>${message.trim().replace(/\n/g, "<br />")}</p>
        </div>
      `
    });

    return res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Portfolio backend listening on port ${port}`);
});

