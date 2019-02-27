import Helper from "../helper/helper"

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
}

const userMiddleware = new UserMiddleware()
export default userMiddleware
