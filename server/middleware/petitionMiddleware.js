import usersModel from "../model/usersModel"
import officesModel from "../model/officesModel"

class PetitionMiddleware{
    createPetitionMiddleware(req, res, next){
        if(!req.user && !req.user.id){
            return res.status(401).send({
                status: 401,
                error: `You are not authorized to visit this endpoint. 
                        Please kindly login or create an account to have access`
            })
        }else if(!req.body.office || !(req.body.office).trim()){
            return res.status(400).send({
                status: 400,
                error: "Political office not provided"
            })
        }else if(!req.body.body || !(req.body.body).trim()){
            return res.status(400).send({
                status: 400,
                error: "Details of Petiton not provided"
            })
        }else if(isNaN(parseInt(req.user.id))){
            return res.status(400).send({
                status: 400,
                error: "User Id should be an integer, not a string"
            })
        }else if(isNaN(parseInt(req.body.office))){
            return res.status(400).send({
                status: 400,
                error: "Integer required but String was passed as office"
            })
        }else if(!isNaN(parseInt(req.body.body))){
            return res.status(400).send({
                status: 400,
                error: "String required but integer was passed as body of your petition"
            })
        }else if(!isNaN(parseInt(req.body.evidence))){
            return res.status(400).send({
                status: 400,
                error: "String required but integer was passed as body of your petition"
            })
        }


        const user = usersModel.selectUserById([req.user.id])
        user.then(rows => {
            if(rows.length === 0){
                return res.status(404).send({
                    status: 404,
                    error: "This user doesn't exist"
                })
            }else{
                const office = officesModel.selectAnOffice([req.body.office])
                office.then(rows => {
                    if(rows.length === 0){
                        return res.status(404).send({
                            status: 404,
                            error: "This office doesn't exist"
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
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }
}

const petitionMiddleware = new PetitionMiddleware()
export default petitionMiddleware
