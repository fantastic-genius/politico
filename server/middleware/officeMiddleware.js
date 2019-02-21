import {offices} from "../db/db"
import usersModel from "../model/usersModel"
import officesModel from "../model/officesModel"
import partiesModel from "../model/partiesModel"
import candidatesModel from "../model/candidatesModel"
class OfficeMiddleware{
    createOfficeMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id && req.user.is_admin === false){
            return res.status(403).send({
                status: 403,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.body.type || !(req.body.type).trim()){
            return res.status(400).send({
                status: 400,
                error: "Office type not included in the data posted" 
            })
        }else if(!req.body.name || !(req.body.name).trim()){
            return res.status(400).send({
                status: 400,
                error: "Office name not included in the data posted" 
            })
        }else if(!isNaN(parseInt(req.body.type))){
            return res.status(400).send({
                status: 400,
                error: "Office type contains an integer instead of a string" 
            })
        }else if(!isNaN(parseInt(req.body.name))){
            return res.status(400).send({
                status: 400,
                error: "Office name contains an integer instead of a string" 
            })
        }

        const offices = officesModel.selectAllOffice()
        offices.then(rows => {
            rows.map(row => {
                if((row.name).toLowerCase() == (req.body.name).toLowerCase()){
                    return res.status(409).send({
                        status: 409,
                        error: `${req.body.name} already existed` 
                    })
                }
            })

            next(); 
        })
    }

    createCandidateMiddleware(req, res, next){
        if(!req.user && !req.user.id && req.user.is_admin === false){
            return res.status(403).send({
                status: 403,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.body.office){
            return res.status(400).send({
                status: 400,
                error: "Political office not provided"
            })
        }else if(!req.body.party){
            return res.status(400).send({
                status: 400,
                error: "Political party not provided"
            })
        }else if(isNaN(parseInt(req.body.office))){
            return res.status(400).send({
                status: 400,
                error: "Integer required but String was passed as office"
            })
        }else if(isNaN(parseInt(req.body.party))){
            return res.status(400).send({
                status: 400,
                error: "Integer required but String was passed as office"
            })
        }else if(isNaN(parseInt(req.params.id))){
            return res.status(400).send({
                status: 400,
                error: "Integer required but String was passed as user id"
            })
        }

        const promis = usersModel.selectUserById([req.params.id])
        promis.then(rows => {
            if(rows.length === 0){
                return res.status(404).send({
                    status: 404,
                    error: "User does not exist"
                })
            }else{
                const candidate = candidatesModel.selectACandidate([req.params.id])
                
                candidate.then(rows => {
                    if(rows.length > 0){
                        return res.status(403).send({
                            status: 403,
                            error: "You have already applied. You are not allowed to show interest for an office or more twice"
                        })
                    }else{
                        const office = officesModel.selectAnOffice([req.body.office])
                        office.then(rows => {
                            if(rows.length === 0){
                                return res.status(404).send({
                                    status: 404,
                                    error: "Political office does not exist"
                                })
                            }else{
                                const party = partiesModel.selectAParty([req.body.party])
                                party.then(rows => {
                                    if(rows.length === 0){
                                        return res.status(404).send({
                                            status: 404,
                                            error: "Political party does not exist"
                                        })
                                    }else{
                                        next()
                                    }
                                })
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
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    getOfficeVotesMiddleware(req, res, next){
        if(!req.user && !req.user.id){
            return res.status(401).send({
                status: 401,
                error: `You are not authorized to visit this endpoint. 
                        Please kindly login or create an account to have access`
            })
        }else if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "Office Id not provided"
            })
        }else if(isNaN(parseInt(req.params.id))){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed in"
            })
        }

        next()
    }
}

const officeMiddleware = new OfficeMiddleware()
export default officeMiddleware
