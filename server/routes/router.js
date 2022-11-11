const express = require ('express')
const route = express.Router()

const services = require('../services/render');
const materialController = require('../controller/materialController');
const loanController = require('../controller/loanController');
//Materials
/*
* @description Root Route
* @method GET /
*/
route.get("/", services.homeRoutes);
/*
* @description add material
* @method GET /add-material
*/
route.get("/add-material", services.addMaterial);
/*
* @description update material
* @method GET /update-material
*/
route.get("/update-material",services.updateMaterial);

//Loans
/*
* @description Root Route
* @method GET /
*/
route.get("/loans", services.allLoans);
/*
* @description add loan
* @method GET /add-loan
*/
route.get("/add-loan", services.addLoan);

//API
//Material
route.post('/api/materials', materialController.create)
route.get('/api/materials', materialController.find)
route.put('/api/materials/:id', materialController.update)
route.delete('/api/materials/:id', materialController.delete)
//Loan
route.post('/api/loans', loanController.create)
route.get('/api/loans', loanController.find)
route.put('/api/loans/:id', loanController.update)
route.delete('/api/loans/:id', loanController.delete)


module.exports = route;
