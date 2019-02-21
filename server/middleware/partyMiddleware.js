import {parties} from "../db/db"
import partiesModel from "../model/partiesModel"
class PartyMiddleware{

    createPartyMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id && req.user.is_admin === false){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.body.name || !(req.body.name).trim()){
            return res.status(400).send({
                status: 400,
                error: "Party name not included in the data posted" 
            })
        }else if(!req.body.hqAddress || !(req.body.hqAddress).trim()){
            return res.status(400).send({
                status: 400,
                error: "Party headquarter not included in the data posted" 
            })
        }else if(!req.body.logoUrl || !(req.body.logoUrl).trim()){
            return res.status(400).send({
                status: 400,
                error: "Party logo Url not included in the data posted" 
            })
        }else if(!isNaN(parseInt(req.body.name))){
            return res.status(400).send({
                status: 400,
                error: "Party name contains an integer instead of a string" 
            })
        }else if(!isNaN(Number(req.body.hqAddress))){
            return res.status(400).send({
                status: 400,
                error: "Party headquarter contains an integer instead of a string" 
            })
        }else if(!isNaN(parseInt(req.body.logoUrl))){
            return res.status(400).send({
                status: 400,
                error: "Party logo URL contains an integer instead of a string" 
            })
        }
        
        const parties = partiesModel.selectAllParty()
        parties.then(rows => {
            rows.map(row => {
                if((row.name).toLowerCase() == (req.body.name).toLowerCase()){
                    return res.status(409).send({
                        status: 409,
                        error: `${req.body.name} already existed` 
                    })
                }
            })

            next(); 
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })

    }


    editPartyMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id  && req.user.is_admin === false){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "Party id not provided" 
            })
        }else if(!req.body.name || !(req.body.name).trim()){
            return res.status(400).send({
                status: 400,
                error: "new party name not provided"
            })
        }else if(isNaN(parseInt(req.params.id))){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed in"
            })
        }else if(!isNaN(parseInt(req.body.name))){
            return res.status(400).send({
                status: 400,
                error: "Party name provided contains a number instead of a string"
            })
        }

        const party = partiesModel.selectAllParty()
        party.then(rows => {
            rows.map(row => {
                if((row.name).toLowerCase() === (req.body.name).toLowerCase()){
                    return res.status(409).send({
                        status: 409,
                        error: `${req.body.name} already existed` 
                    })
                }
            })

            next(); 
        })
    }

    deletePartyMiddleware(req, res, next){
        if(process.env.NODE_ENV !== 'test' && !req.user && !req.user.id && req.user.is_admin === false){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "Party not provided"
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

const partyMiddleware = new PartyMiddleware();
export default partyMiddleware;
