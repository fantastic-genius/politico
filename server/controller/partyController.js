import {parties} from "../db/db"

class PartyController{
    createParty(req, res){

        const body = req.body;
        const {name, hqAddress, logoUrl} = body;
        const len = parties.length
        const id = parties[len-1].id + 1;
        const party = {
            id,
            name,
            hqAddress,
            logoUrl
        }

        parties.push(party);

        return res.status(201).send({
            status: 201,
            data: [{
                id,
                name
            }]
        })
    }

    getAllParty(req, res){

        let data = []

        parties.map(party => {
            let {id, name, logoUrl} = party
            let cur_data = {
                id,
                name,
                logoUrl
            }
            data.push(cur_data)
        })


        return res.status(200).send({
            status: 200,
            data
        })
    }

    getAParty(req, res){
        const id = parseInt(req.params.id)

        if(isNaN(id)){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed in"
            })
        }
        
        parties.map(party => {
            if(party.id === id){
                const data = [
                    {
                        id: party.id,
                        name: party.name,
                        logoUrl: party.logoUrl
                    }
                ]

                return res.status(200).send({
                    status: 200,
                    data
                })
                
            }

        })

        return res.status(404).send({
            status: 404,
            error: "Party not found"
        })
        
    }

    editAParty(req, res){
        const param_id = parseInt(req.params.id);
        const param_name = req.body.name;

        parties.map(party => {
            if(party.id === param_id){
                party.name = param_name
                const {id, name} = party

                return res.status(200).send({
                    status: 200,
                    data: [{
                        id,
                        name
                    }]
                })
            }
        })

        return res.status(404).send({
            status: "404",
            error: "Party doesn't exist"
        })

        
    }

    deleteParty(req, res){
        const id = parseInt(req.params.id)
        parties.map((party, i) => {
            if(party.id === id){
                parties.splice(i, 1)
                const name = party.name;
                return res.status(200).send({
                    status: 200,
                    message: `${name} deleted from list of political parties`
                })
            }
        })

        return res.status(404).send({
            status: "404",
            error: "Party doesn't exist"
        })
    }
}

const partyController = new PartyController();

export default partyController;
