const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.use(chaiHttp);
let materialLength
let materialId
let loanLength
let loanId

describe("Get all Materials", () => {
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        done();
        materialLength = res.body.length;
      });
  });
  it("Return all material", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(materialLength);
        done();
      });
  });
  it("Return array", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res.body).to.be.a("array");
        done();
      });
  });
});

describe("Get one Material", () => {
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .get("/api/materials?id=6373a36c09ea89ea0c2be773")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Return material", (done) => {
    chai
      .request(app)
      .get("/api/materials?id=6373a36c09ea89ea0c2be773")
      .end((err, res) => {
        expect(res.body).to.have.property("_id");
        done();
      });
  });
  it("Return an object", (done) => {
    chai
      .request(app)
      .get("/api/materials?id=6373a36c09ea89ea0c2be773")
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
describe("Post material & Delete new material", () => {
    const material = {
        reference: "Samsung Galaxy S3",
        description: 'Tablette samsung'
    }
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .post("/api/materials/")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(material)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done()
      });
  });
  it("Return all material length", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(materialLength + 1);
        materialId = res.body[materialLength]._id.toString();
        done();
      });
  });
  it("Delete material", (done) => {
    chai
      .request(app)
      .delete(`/api/materials/${materialId}`)
      .end((err, res) => {
        //console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Return all material length", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(materialLength);
        done();
      });
  });
});





//LOAN
describe("Get all Loans", () => {
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .get("/api/loans/")
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        done();
        loanLength = res.body.length;
      });
  });
  it("Return all loans", (done) => {
    chai
      .request(app)
      .get("/api/loans/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(loanLength);
        done();
      });
  });
  it("Return array", (done) => {
    chai
      .request(app)
      .get("/api/loans/")
      .end((err, res) => {
        expect(res.body).to.be.a("array");
        done();
      });
  });
});
describe("Post material & Create loan", () => {
    const material = {
        reference: "Samsung Galaxy S3",
        description: 'Tablette samsung'
    }
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .post("/api/materials/")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(material)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done()
      });
  });
  it("Return the material", (done) => {
    chai
      .request(app)
      .get("/api/materials/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(materialLength + 1);
        materialId = res.body[materialLength]._id.toString();
        done();
      });
  });
  it("Return statusCode 200", (done) => {
    chai
      .request(app)
      .post("/api/loans/")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({email:"test@test.com", startDate: Date.now(), endDate: '2022-12-30', material: materialId })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done()
      });
  });
  it("Return all loans", (done) => {
    chai
      .request(app)
      .get("/api/loans")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(loanLength + 1);
        loanId = res.body[loanLength]._id.toString();
        done();
      });
  });
  it("Return the loan", (done) => {
    chai
      .request(app)
      .get(`/api/loans?id=${loanId}`)
      .end((err, res) => {
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("Delete loan", (done) => {
    chai
      .request(app)
      .delete(`/api/loans/${loanId}`)
      .end((err, res) => {
        //console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Return all loan length", (done) => {
    chai
      .request(app)
      .get("/api/loans/")
      .end((err, res) => {
        expect(res.body).to.have.lengthOf(loanLength);
        done();
      });
  });
  it("Delete Material", (done) => {
    chai
      .request(app)
      .delete(`/api/materials/${materialId}`)
      .end((err, res) => {
        //console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});


// describe("PUT /api/materials/:id", (done) => {
//     it("should update material", () => {
//         request(app)
//             .put("/api/materials/636e10706401a07cc38fb20e")
//             .expect(200, done)
//             .send({ reference: "test tache TDD update" });
//     });
// });

// describe("DELETE /api/materials/:id", (done) => {
//     it("should delet material", () => {
//         request(app)
//             .delete("/api/materials/636e10706401a07cc38fb20e")
//             .expect(200, done)
//             .send({ message: "material deleted" });
//     });
// });

// // loan
// describe("POST /api/loans", (done) => {
//     it("Should add loans", () => {
//         request(app)
//             .post("/api/loans")
//             .send({ email: "test@gmail.com", startDate: Date.now(), endDate: '2022-11-30', material: '636e10706401a07cc38fb20e' })
//             .expect(200, done);
//     });
// });

// describe("GET /api/loans", (done) => {
//     it("should get all loans", () => {
//         request(app).get('/api/loans').expect(200, done)
//     });
// });

// describe("GET /api/loans/:id", (done) => {
//     it("should get a particular loan", () => {
//         request(app).get("/api/loans/636e10706401a07cc38fb20e").expect(200, done);
//     });
// });

// describe("PUT /api/loans/:id", (done) => {
//     it("should update loan", () => {
//         request(app)
//             .put("/api/loans/636e10706401a07cc38fb20e")
//             .expect(200, done)
//             .send({ reference: "test tache TDD update" });
//     });
// });

// describe("DELETE /api/loans/:id", (done) => {
//     it("should delet loan", () => {
//         request(app)
//             .delete("/api/loans/636e10706401a07cc38fb20e")
//             .expect(200, done)
//             .send({ message: "loan deleted" });
//     });
// });
