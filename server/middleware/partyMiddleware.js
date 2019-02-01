class PartyMiddleware{

    createPartyMiddleware(req, res, next){
        if(!req.body.name){
            return res.status(400).send({
                status: 400,
                error: "Party name not included in the data posted" 
            })
        }else if(!req.body.hqAddress){
            return res.status(400).send({
                status: 400,
                error: "Party headquarter not included in the data posted" 
            })
        }else if(!req.body.logoUrl){
            return res.status(400).send({
                status: 400,
                error: "Party logo Url not included in the data posted" 
            })
        }

        next();
    }


    editPartyMiddleware(req, res, next){
        if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "Party id not provided" 
            })
        }else if(!req.body.name){
            return res.status(400).send({
                status: 400,
                error: "new party name not provided"
            })
        }else if(isNaN(parseInt(req.params.id))){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed in"
            })
        }

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
