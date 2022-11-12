const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");

const sendEmailLoanMaterial = async (loan) => {
  const requiredPath = path.join(__dirname, "../../../views/sendMail.ejs");
  console.log(loan);
  const data = await ejs.renderFile(requiredPath, {
    loan: loan,
  });
  var mainOptions = {
    from: '"NormandieWebSchool" normandiewebschool@gmail.com',
    to: loan.email,
    subject: "Pret",
    html: data,
  };
  console.log(mainOptions);
  await transporter.sendMail(mainOptions);
};

module.exports = sendEmailLoanMaterial;
