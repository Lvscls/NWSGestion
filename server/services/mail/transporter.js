const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "704f39a3816a15",
    pass: "be070a7b6cf04a",
  },
});

// checking connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  }
  console.log("Mail server is running...");
});

module.exports = transporter;
