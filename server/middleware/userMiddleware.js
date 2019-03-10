import Helper from "../helper/helper"
import usersModel from "../model/usersModel"
class UserMiddleware{
    getUserByEmailMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id && req.user.is_admin === false){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.params.email){
            return res.status(404).send({
                status: 404,
                error: "Email not provided"
            })
        }else if(!isNaN(Number(req.params.email))){
            return res.status(400).send({
                status: 400,
                error: "Email contains an integer instead of a string" 
            })
        }else if(!Helper.isValidEmail(req.params.email)){
            return res.status(400).send({
                status: 400,
                error: "Email provided not a vaild email" 
            })
        }

        next()
    }

    getUserByIdMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.params.id){
            return res.status(404).send({
                status: 404,
                error: "User id not provided"
            })
        }else if(isNaN(parseInt(req.params.id))){
            return res.status(400).send({
                status: 400,
                error: "An integer is expected not a string" 
            })
        }

        next()
    }

    editUserMiddleware(req, res, next){
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
        }

        const user = usersModel.selectUserById([req.params.id])
        user.then(rows => {
            if(rows.length > 0){
                next()
            }else{
                return res.status('404').send({
                    status: 404,
                    error: "This user doesn't exist"
                })
            }
        })
    }


    editPassportUrlMiddleware(req, res, next){
        if(req.image){
            req.body.passporturl = req.image.url
        }

        if(!isNaN(parseInt(req.body.passporturl))){
            return res.status(400).send({
                status: 400,
                error: "Passport URL contains an integer instead of a string" 
            })
        }

        const user = usersModel.selectUserById([req.params.id])
        user.then(rows => {
            if(rows.length > 0){
                next()
            }else{
                return res.status('404').send({
                    status: 404,
                    error: "This user doesn't exist"
                })
            }
        })
    }
}

const userMiddleware = new UserMiddleware()
export default userMiddleware
