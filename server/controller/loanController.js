var Loandb = require("../model/loanModel");
var Materialdb = require("../model/materialModel");
const sendEmailLoanMaterial = require("../services/mail/sendEmailLoanMaterial");

//create loan
exports.create = (req, res) => {
  //validation request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new loan
  const material = req.body.material;
  const loan = new Loandb({
    email: req.body.email,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    material: material,
  });

  loan
    .save(loan)
    .then(async (data) => {
      res.redirect("/add-loan");
      console.log("data is " + data);
      await sendEmailLoanMaterial(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  Materialdb.findByIdAndUpdate(
    material,
    { statut: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Material : ", docs);
      }
    }
  );
};

//retrieve and return all loans/ retieve and return a single loan
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Loandb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Cannot find loan" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error" });
      });
  } else {
    Loandb.find()
      .then((loan) => {
        res.send(loan);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

//Update a loan
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Data can be empty");
  }

  const id = req.params.id;
  Loandb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update loan with ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Cannot update loan" });
    });
};

//delete a loan
exports.delete = (req, res) => {
  const id = req.params.id;

  Loandb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete loan with ${id}` });
      } else {
        res.send({ message: "Loan was deleted" });
        const material = data.material;
        Materialdb.findByIdAndUpdate(
          material,
          { statut: false },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log("Updated Material : ", docs);
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete loan",
      });
    });
};
