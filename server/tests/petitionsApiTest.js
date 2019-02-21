import app from '../../index'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

const chai = require("chai")
const chaiHttp = require("chai-http")

chai.use(chaiHttp)
const should = chai.should();
dotenv.config()
const SECRET = process.env.SECRET
const token = jwt.sign({id: 1, email: 'admin@politico.com', is_admin: true}, 
                    SECRET,
                    {expiresIn: '12h'})

describe("Petitions", () => {
    
    describe("POST /api/v1/petitions", () => {
        it("Should return status and user's petition details", (done) => {
            chai.request(app)
                .post("/api/v1/petitions")
                .set("x-access-token", token)
                .send({
                    office: "1",
                    body: "I am not satisfied with the election result. It was rigged in many places",
                    evidence: ""
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(201);
                    res.type.should.equal("application/json");
                    res.body.should.be.a('object');
                    res.body.status.should.equal(201);
                    res.body.data[0].should.include.keys('id', 'office', 'createdBy', 'text', 'evidence');
                    done();
                })
        })
    })

})
