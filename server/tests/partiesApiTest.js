import app from '../../index'
import {parties} from "../db/db"

const chai = require("chai")
const chaiHttp = require("chai-http")


chai.use(chaiHttp)

const should = chai.should();

describe("Parties", () => {
    describe("POST /api/v1/parties", () => {
        it('should return newly created party data', (done) => {
            chai.request(app)
                .post("/api/v1/parties")
                .send({
                    name : "peoples democratic party",
                    hqAddress : "Wuse rd, Abuja",
                    logoUrl : "http://apc.com/logo",
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(201);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(201);
                    res.body.data[0].should.include.keys('id', 'name');
                    done();
                })
        })
    })


    describe("GET /api/v1/parties", () => {
        it('should return all the existing party data', (done) => {
            chai.request(app)
                .get("/api/v1/parties")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data.length.should.equal(parties.length);
                    res.body.data[0].should.include.keys('id', 'name', 'logoUrl');
                    done();
                })
        })
    })

    describe("GET /api/v1/parties/<id>", () => {
        it('should return the data of the party requested', (done) => {
            chai.request(app)
                .get("/api/v1/parties/2")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data.length.should.equal(1);
                    res.body.data[0].should.include.keys('id', 'name', 'logoUrl');
                    done();
                })
        })
    })

    describe("PATCH /api/v1/parties/<id>/name", () => {
        it("should return the status 200 and the id and new name of the edited party", (done) => {
            chai.request(app)
                .patch("/api/v1/parties/2/name")
                .send({
                    name: "Labour Party"
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.be.equal("application/json")
                    res.body.should.be.a("object")
                    res.body.status.should.equal(200)
                    res.body.data[0].should.include.keys("id", "name")
                    done()
                })
        })
    })

    describe("DELETE /api/v1/parties/<id>", () => {
        it("Should return message that about the party deleted and status 200", (done) => {
            chai.request(app)
                .delete("/api/v1/parties/2")
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.be.equal("application/json")
                    res.body.should.be.a("object")
                    res.body.status.should.equal(200)
                    res.body.message.should.be.a("string")
                    done()
                })
        })
    })
})
