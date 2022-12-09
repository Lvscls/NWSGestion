const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");
const moment = require("moment");

const sendEmailLoanMaterial = async (loan) => {
  const requiredPath = path.join(__dirname, "../../../views/sendMail.ejs");
  console.log(loan);

  const mail = await fetch("http://vps-a47222b1.vps.ovh.net:4242/Student", {
    method: "GET",
  }).then((res) => res.json()).then((data) => data[loan.idStudent-1].mail);

  const data = await ejs.renderFile(requiredPath, {
    loan: loan,
    moment: moment,
  });
  var mainOptions = {
    from: '"NormandieWebSchool" normandiewebschool@gmail.com',
    to: mail,
    subject: "Pret",
    html: data,
  };
  console.log(mainOptions);
  await transporter.sendMail(mainOptions);
};

module.exports = sendEmailLoanMaterial;
