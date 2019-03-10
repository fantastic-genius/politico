import chai from 'chai'
import chaiHttp from 'chai-http'
import app from "../../index"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

chai.use(chaiHttp)
const should = chai.should()

dotenv.config()
const SECRET = process.env.SECRET
const token = jwt.sign({id: 1, email: 'admin@politico.com', is_admin: true}, 
                    SECRET,
                    {expiresIn: '12h'})

describe("Users", () => {
    describe("GET api/v1/users/<email>/email", () => {
        it("should return status 200 and user data", (done) => {
            chai.request(app)
                .get("/api/v1/users/admin@politico.com/email")
                .set("x-access-token", token)
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('id');
                    done();
                })
        })
    })


    describe("GET api/v1/users/<user_id>", () => {
        it("should return status 200 and user data", (done) => {
            chai.request(app)
                .get("/api/v1/users/1")
                .set("x-access-token", token)
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object')
                    res.body.status.should.equal(200)
                    res.body.data[0].should.include.keys('id', 'firstname', 'othername', 'lastname', 'email', 'phonenumber', 'passporturl', 'isadmin');
                    done();
                })
        })
    })

    describe("PATCH api/v1/users/<user_id>", () => {
        it("should return status 200 and user data", (done) => {
            chai.request(app)
                .patch("/api/v1/users/1")
                .set("x-access-token", token)
                .send({
                    firstname: 'Mack',
                    othername: '',
                    lastname: 'Zuckerberg',
                    phoneNumber: '08012345678'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object')
                    res.body.status.should.equal(200)
                    res.body.data[0].should.include.keys('id', 'firstname', 'othername', 'lastname', 'email', 'phonenumber', 'passporturl', 'isadmin')
                    done();
                })
        })
    })


    describe("PATCH api/v1/users/<user_id>/passport", () => {
        it("should return status 200 and user data", (done) => {
            chai.request(app)
                .patch("/api/v1/users/1/passport")
                .set("x-access-token", token)
                .send({
                    passporturl: 'http://res.cloudinary.com/dbd5poy8d/image/upload/v1552132527/politico/ywmwtvkdrp2ljnbefwnb.jpg'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object')
                    res.body.status.should.equal(200)
                    res.body.data[0].should.include.keys('id', 'passportUrl')
                    done();
                })
        })
    })
})
