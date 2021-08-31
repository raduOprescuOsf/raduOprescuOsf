const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe("Server connection!", () => {
    it("Server connection fine", (done) => {
      chai.request(app).get("/").end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
})

describe("Accesing pages!", () => {
  it("Server acces womens api", (done) => {
    chai.request(app).get("/categories/womens").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Server acces mens api", (done) => {
    chai.request(app).get("/categories/mens").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Server acces categories for women", (done) => {
    chai.request(app).get("/categories/womens/womens-clothing").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Server acces subcategoriesfor women", (done) => {
    chai.request(app).get("/categories/womens/womens-clothing/womens-clothing-tops").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Server acces categories for man", (done) => {
    chai.request(app).get("/categories/mens/mens-clothing").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Server acces subcategoriesfor mens", (done) => {
    chai.request(app).get("/categories/mens/mens-clothing/mens-clothing-suits").end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
 
})


