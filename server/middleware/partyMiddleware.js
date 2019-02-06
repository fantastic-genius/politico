import {parties} from "../db/db"
class PartyMiddleware{

    createPartyMiddleware(req, res, next){
        if(!req.body.name || !(req.body.name).trim()){
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
        
        parties.map(party => {
            if(party.name === req.body.name){
                return res.status(412).send({
                    status: 412,
                    error: `${req.body.name} already existed` 
                })
            } 
        })

        next();
    }


    editPartyMiddleware(req, res, next){
        if(!req.params.id){
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

        parties.map(party => {
            if(party.id !== parseInt(req.params.id)){
                if(party.name === req.body.name && party.type === req.body.type){
                    return res.status(412).send({
                        status: 412,
                        error: `${req.body.name} already existed` 
                    })
                }
            }
        })

        next()
    }

    deletePartyMiddleware(req, res, next){
        if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "Party does not exist"
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
