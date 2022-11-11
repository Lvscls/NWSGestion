var Materialdb = require("../model/materialModel");

//create a new Material
exports.create = (req, res) => {
  //validation request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new material
  const material = new Materialdb({
    reference: req.body.reference,
    description: req.body.description,
    statut: false,
  });

  //save material in the database
  material
    .save(material)
    .then((data) => {
      // res.send(data);
      res.redirect('/add-material')
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error happened" });
    });
};

//retrieve and return all materials/ retieve and return a single material
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Materialdb.findById(id).then(data => {
      if(!data){
        res.status(404).send({message: 'Cannot find material'})
      }else{
        res.send(data)
      }
    }).catch(err => {
      res.status(500).send({message: "Error"})
    })
  } else {
    Materialdb.find()
      .then((material) => {
        res.send(material);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

//Update a material
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Data can be empty");
  }

  const id = req.params.id;
  Materialdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update material with ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Cannot update material" });
    });
};

//delete a material
exports.delete = (req, res) => {
  const id = req.params.id;

  Materialdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete material with ${id}` });
      } else {
        res.send({ message: "Material was deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete material",
      });
    });
};
