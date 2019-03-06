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

describe("Auth", () => {
    describe("POST api/v1/auth/signup", () => {
        it("should return status 201, token and user data", (done) => {
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    othername: '',
                    email: 'user@politico.com',
                    password: 'password',
                    phoneNumber: '08012345678'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(201)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(201);
                    res.body.data[0].should.include.keys('token', 'user');
                    done();
                })
        })
    })

    describe("POST api/v1/auth/login", () => {
        it("should return status 201, token and user data", (done) => {
            chai.request(app)
                .post("/api/v1/auth/login")
                .send({
                    email: 'user@politico.com',
                    password: 'password'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('token', 'user');
                    done();
                })
        })
    })


    describe("POST api/v1/auth/reset", () => {
        it("should return status 200, and data containing message and email", (done) => {
            chai.request(app)
                .post("/api/v1/auth/reset")
                .send({
                    email: 'user@politico.com',
                    baseUrl: 'http://localhost/UI/change.html'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.data[0].should.include.keys('message', 'email');
                    done();
                })
        })
    })

    describe("PATCH api/v1/auth/reset/password", () => {
        it("should return status 200 and success message", (done) => {
            chai.request(app)
                .patch("/api/v1/auth/reset/password")
                .send({
                    resetToken: token,
                    password: 'password'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.message.should.equal('Password successfully changed');
                    done();
                })
        })
    })


    describe("PATCH api/v1/auth/<user_id>/password", () => {
        it("should return status 200 and success message", (done) => {
            chai.request(app)
                .patch("/api/v1/auth/1/password")
                .set("x-access-token", token)
                .send({
                    oldPassword: 'password',
                    newPassword: 'password'
                })
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.equal(200)
                    res.type.should.equal('application/json')
                    res.body.should.be.a('object');
                    res.body.status.should.equal(200);
                    res.body.message.should.equal('Password successfully changed');
                    done();
                })
        })
    })
})
