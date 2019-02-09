import app from '../../index'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const should = chai.should();
dotenv.config()
const SECRET = process.env.SECRET || "nukaleda9306ailus$&fahnius"
const token = jwt.sign({id: 1, email: 'admin@politico.com', is_admin: true}, 
                    SECRET,
                    {expiresIn: '12h'})

describe("Parties", () => {
    describe("POST /api/v1/parties", () => {
        it('should return newly created party data', (done) => {
            chai.request(app)
                .post("/api/v1/parties")
                .set("x-access-token", token)
                .send({
                    name : "Alliance Democracy Progressive",
                    hqAddress : "Wuse rd, Abuja",
                    logoUrl : "http://ad.com/logo",
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
                .set("x-access-token", token)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('id', 'name', 'logoUrl');
                    done();
                })
        })
    })

    describe("GET /api/v1/parties/<id>", () => {
        it('should return the data of the party requested', (done) => {
            chai.request(app)
                .get("/api/v1/parties/1")
                .set("x-access-token", token)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('id', 'name', 'logoUrl');
                    done();
                })
        })
    })

    describe("PATCH /api/v1/parties/<id>/name", () => {
        it("should return the status 200 and the id and new name of the edited party", (done) => {
            chai.request(app)
                .patch("/api/v1/parties/3/name")
                .set("x-access-token", token)
                .send({
                    name: "All Progressive Party"
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
                .set("x-access-token", token)
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
