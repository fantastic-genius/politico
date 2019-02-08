import app from "../../index"
import chai from "chai"
import chaiHttp from "chai-http"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

chai.use(chaiHttp)
const should = chai.should()

const token = jwt.sign({id: 1, email: 'admin@politico.com', is_admin: true}, 
                    process.env.SECRET,
                    {expiresIn: '12h'})

describe("Offices", () => {
    describe("POST /api/v1/offices", () => {
        it('should return newly created office', (done) => {
            chai.request(app)
                .post("/api/v1/offices")
                .set("x-access-token", token)
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
                .set("x-access-token", token)
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
                .set("x-access-token", token)
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
                .set("x-access-token", token)
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
})
