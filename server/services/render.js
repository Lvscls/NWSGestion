const axios = require("axios");
const { response } = require("express");
const moment = require('moment');

//home
exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/materials")
    .then(function (response) {
      console.log(response.data);
      res.render("index", { materials: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
//addMaterial form
exports.addMaterial = (req, res) => {
  res.render("add_material");
};
//updateMaterial form
exports.updateMaterial = (req, res) => {
  axios.get("http://localhost:3000/api/materials", {
    params: { id: req.query.id },
  }).then(function(materialdata){
    res.render("update_material", {material: materialdata.data});
  }).catch(err=>{
    response.send(err)
  })
};

//all loans
exports.allLoans = (req, res) => {
  axios
    .get("http://localhost:3000/api/loans")
    .then(function (response) {
      console.log(response.data);
      res.render("all-loan", { loans: response.data, moment });
    })
    .catch((err) => {
      res.send(err);
    });

};

//addLoan form
exports.addLoan = (req, res) => {
  let material = "http://localhost:3000/api/materials"
  let student = "http://vps-a47222b1.vps.ovh.net:4242/Student"

  const getMaterial = axios.get(material)
  const getStudent = axios.get(student)

  axios
  .all([getMaterial, getStudent])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];

      // use/access the results
      res.render("add_loan", { materials: responseOne.data, users: responseTwo.data });
    })
  )
  .catch((err) => {
    // res.send(err);
  });

};
