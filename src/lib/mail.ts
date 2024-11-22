import nodemailer from "nodemailer";

// Create a transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Disable strict SSL
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"BugTracker" <${process.env.EMAIL_USER}>`, // Sender address
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
