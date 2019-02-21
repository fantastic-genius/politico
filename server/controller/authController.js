import jwt from "jsonwebtoken"
import usersModel from "../model/usersModel"
import bcrypt from "bcryptjs"
class AuthController{
    signup(req, res){
        const {firstname, lastname, othername, email, phoneNumber} = req.body;
        const unhashed_pass = req.body.password
        const password = bcrypt.hashSync(unhashed_pass, bcrypt.genSaltSync(8))
        const isAdmin = false
        const values = [firstname, lastname, othername, email, password, phoneNumber, isAdmin]

        const user = usersModel.createUser(values)
        user.then(rows => {
            if(rows.length > 0){
                const token = jwt.sign({id: rows[0].id, email: rows[0].email, is_admin:rows[0].isadmin}, 
                    process.env.SECRET,
                    {expiresIn: '12h'})
                    
                delete rows[0].password

                return res.status(201).send({
                    status: 201,
                    data:[{
                        token,
                        user: rows[0]
                    }]
                })
            }else{
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }

        }).catch(err => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })        
    }

    login(req, res){
        const {email} = req.body;
        const unhashed_pass = req.body.password
        const value = [email]
        const user = usersModel.selectAUser(value)
        user.then(rows => {
            if(rows.length > 0){
                if(bcrypt.compareSync(unhashed_pass, rows[0].password)){
                    const token = jwt.sign({id: rows[0].id, email: rows[0].email, is_admin:rows[0].isadmin}, 
                        process.env.SECRET,
                        {expiresIn: '12h'})
                        
                    delete rows[0].password

                    return res.status(200).send({
                        status: 200,
                        data:[{
                            token,
                            user: rows[0]
                        }]
                    })
                }else{
                    return res.status(412).send({
                        status: 412,
                        error: "Password Incorrect"
                    })
                }
            }else{
                return res.status(400).send({
                    status: 400,
                    error: "No such account exist"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    reset(req, res){
        const {email} = req.body
        return res.status(200).send({
            status: 200,
            data: [{
                message: "Check your email for password reset link",
                email
            }]
        })
    }
}

const authController = new AuthController()
export default authController
