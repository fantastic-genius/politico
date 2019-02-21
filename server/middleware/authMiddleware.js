import Helper from "../helper/helper"
import usersModel from "../model/usersModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

class AuthMiddleware{
    signupMiddleware(req, res, next){
        if(!req.body.firstname || !(req.body.firstname).trim()){
            return res.status(400).send({
                status: 400,
                error: "Firstname not provided"
            })
        }else if(!req.body.lastname || !(req.body.lastname).trim()){
            return  res.status(400).send({
                status: 400,
                error: "Lastname not provided"
            })
        }else if(!req.body.email || !(req.body.email).trim()){
            return res.status(400).send({
                status: 400,
                error: "Email not provided"
            })
        }else if(!req.body.password || !(req.body.password).trim()){
            return  res.status(400).send({
                status: 400,
                error: "Password not provided"
            })
        }else if(!req.body.phoneNumber || !(req.body.phoneNumber).trim()){
            return res.status(400).send({
                status: 400,
                error: "Phone Number not provided"
            })
        }else if(!isNaN(parseInt(req.body.firstname))){
            return res.status(400).send({
                status: 400,
                error: "Firstname contains an integer instead of a string" 
            })
        }else if(!isNaN(parseInt(req.body.lastname))){
            return res.status(400).send({
                status: 400,
                error: "Lastname contains an integer instead of a string" 
            })
        }else if(!isNaN(parseInt(req.body.othername))){
            return res.status(400).send({
                status: 400,
                error: "Othername contains an integer instead of a string" 
            })
        }else if(!isNaN(Number(req.body.email))){
            return res.status(400).send({
                status: 400,
                error: "Email contains an integer instead of a string" 
            })
        }else if(!Helper.isValidEmail(req.body.email)){
            return res.status(400).send({
                status: 400,
                error: "Email provided not a vaild email" 
            })
        }

        const prom = usersModel.selectAllUsers()
        prom.then(rows => {
                rows.map(row => {
                    if(row.email == req.body.email){
                        return res.status(400).send({
                            status: 400,
                            error: "Email provided already exist" 
                        })
                    }
                })
                return next()
            }).catch(error => {
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            })       
    }

    loginMiddleware(req, res, next){
        if(!req.body.email || !(req.body.email).trim()){
            return res.status(400).send({
                status: 400,
                error: "Email not provided"
            })
        }else if(!req.body.password || !(req.body.password).trim()){
            return  res.status(400).send({
                status: 400,
                error: "Password not provided"
            })
        }else if(!isNaN(Number(req.body.email))){
            return res.status(400).send({
                status: 400,
                error: "Email contains an integer instead of a string" 
            })
        }else if(!Helper.isValidEmail(req.body.email)){
            return res.status(400).send({
                status: 400,
                error: "Email provided not a vaild email" 
            })
        }

        next()
    }

    async verifyToken(req, res, next){
        if(process.env.NODE_ENV !== 'test'){
            const token = req.headers['x-access-token']
            if(!token){
                return res.status(400).send({
                    status: 400,
                    error: "token not provided"
                })
            }

            try {
                const decoded_token = await jwt.verify(token, process.env.SECRET)
                const id = decoded_token.id
                const is_admin = decoded_token.is_admin
                const user = usersModel.selectUserById([id])
                user.then(rows => {
                    if(rows.length === 0){
                        return res.status(400).send({
                            status: 400,
                            error: "Invalid token provided. You are not authorized to access this page"
                        })
                    }else{
                        req.user = {id, is_admin}
                        next()
                    }
                })
            } catch (error) {
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }
        }
    }

    resetMiddleware(req, res, next){
        if(!req.body.email || !(req.body.email).trim()){
            return res.status(400).send({
                status: 400,
                error: "Email not provided"
            })
        }else if(!isNaN(Number(req.body.email))){
            return res.status(400).send({
                status: 400,
                error: "Email contains an integer instead of a string" 
            })
        }else if(!Helper.isValidEmail(req.body.email)){
            return res.status(400).send({
                status: 400,
                error: "Value provided not a valid email"
            })
        }

        const user = usersModel.selectAUser([req.body.email])
        user.then(rows => {
            if(rows.length == 0){
                return res.status(404).send({
                    status: 404,
                    error: "Such email doesn't exist"
                })
            }else{
                next()
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }
}

const authMiddleware = new AuthMiddleware()
export default authMiddleware
