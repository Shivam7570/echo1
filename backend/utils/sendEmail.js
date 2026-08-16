const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, text }) => {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Echo Admin Portal" <${emailUser}>`,
        to,
        subject,
        text: text || "Password Confirmation Code",
        html,
      });

      console.log(`✉️ Email sent successfully to ${to}. Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`⚠️ Email send error (${to}):`, err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`\n==================================================`);
    console.log(`📧 [EMAIL NOTICE] SMTP credentials not set in .env`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text || html}`);
    console.log(`==================================================\n`);
    return { success: true, simulated: true };
  }
};

module.exports = sendEmail;
