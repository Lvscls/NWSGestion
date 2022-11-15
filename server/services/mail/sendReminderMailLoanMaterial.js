const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");
const moment = require('moment');

const sendReminderEmailLoanMaterial = async (loan) => {
  const requiredPath = path.join(__dirname, "../../../views/sendReminderMail.ejs");
  console.log(loan);
  const data = await ejs.renderFile(requiredPath, {
    loan: loan,
    moment: moment
  });
  var mainOptions = {
    from: '"NormandieWebSchool" normandiewebschool@gmail.com',
    to: loan.email,
    subject: "Rappel de pret",
    html: data,
  };
  console.log(mainOptions);
  await transporter.sendMail(mainOptions);
};

module.exports = sendReminderEmailLoanMaterial;