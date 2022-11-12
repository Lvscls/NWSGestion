const request = require('supertest')
const app = require('../server')

describe("POST /api/materials", (done) => {
    it("Should add materials", () => {
        request(app)
            .post("/api/materials")
            .send({ reference: "test tache TDD", description:'description' })
            .expect(201, done);
    });
});

describe("GET /api/materials", (done) => {
    it("should get all materials", () => {
        request(app).get('/api/materials').expect(200, done)
    });
});

describe("GET /api/materials/:id", (done) => {
    it("should get a particular material", () => {
        request(app).get("/api/materials/636e10706401a07cc38fb20e").expect(200, done);
    });
});

describe("PUT /api/materials/:id", (done) => {
    it("should update material", () => {
        request(app)
            .put("/api/materials/636e10706401a07cc38fb20e")
            .expect(201, done)
            .send({ reference: "test tache TDD update" });
    });
});

describe("DELETE /api/materials/:id", (done) => {
    it("should delet material", () => {
        request(app)
            .delete("/api/materials/636e10706401a07cc38fb20e")
            .expect(204, done)
            .send({ message: "material deleted" });
    });
});

// loan
describe("POST /api/loans", (done) => {
    it("Should add loans", () => {
        request(app)
            .post("/api/loans")
            .send({ email: "test@gmail.com", startDate: Date.now(), endDate: '2022-11-30', material: '636e10706401a07cc38fb20e' })
            .expect(201, done);
    });
});

describe("GET /api/loans", (done) => {
    it("should get all loans", () => {
        request(app).get('/api/loans').expect(200, done)
    });
});

describe("GET /api/loans/:id", (done) => {
    it("should get a particular loan", () => {
        request(app).get("/api/loans/636e10706401a07cc38fb20e").expect(200, done);
    });
});

describe("PUT /api/loans/:id", (done) => {
    it("should update loan", () => {
        request(app)
            .put("/api/loans/636e10706401a07cc38fb20e")
            .expect(201, done)
            .send({ reference: "test tache TDD update" });
    });
});

describe("DELETE /api/loans/:id", (done) => {
    it("should delet loan", () => {
        request(app)
            .delete("/api/loans/636e10706401a07cc38fb20e")
            .expect(204, done)
            .send({ message: "loan deleted" });
    });
});