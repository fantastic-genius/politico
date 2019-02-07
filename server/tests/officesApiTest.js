import app from "../../index"
import {offices} from "../db/db"
import chai from "chai"
import chaiHttp from "chai-http"

chai.use(chaiHttp)
const should = chai.should()

describe("Offices", () => {
    describe("POST /api/v1/offices", () => {
        it('should return newly created office', (done) => {
            chai.request(app)
                .post("/api/v1/offices")
                .send({
                    type: "Legislative",
                    name : "House of Assembly"
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(201);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(201);
                    res.body.data[0].should.include.keys('id', 'type', 'name');
                    done();
                })
        })
    })

    describe("GET /api/v1/offices", () => {
        it('should return all the existing office data', (done) => {
            chai.request(app)
                .get("/api/v1/offices")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('id', 'type', 'name');
                    done();
                })
        })
    })

    describe("GET /api/v1/offices/<id>", () => {
        it('should return the data of the office requested', (done) => {
            chai.request(app)
                .get("/api/v1/offices/3")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data.length.should.equal(1);
                    res.body.data[0].should.include.keys('id', 'type', 'name');
                    done();
                })
        })
    })

    describe("POST /api/v1/offices/<userid>/register", () => {
        it('should return newly registered candidate', (done) => {
            chai.request(app)
                .post("/api/v1/offices/3/register")
                .send({
                    office: 1,
                    party : 1
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(201);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(201);
                    res.body.data[0].should.include.keys('office', 'user');
                    done();
                })
        })
    })

    describe("GET /api/v1/offices/<id>/result", () => {
        it('should return the result of election for an office', (done) => {
            chai.request(app)
                .get("/api/v1/offices/1/result")
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    //res.body.data[0].should.include.keys('office', 'candidate', 'result');
                    done();
                })
        })
    })
})
