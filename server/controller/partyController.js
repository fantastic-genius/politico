import partiesModel from "../model/partiesModel"

class PartyController{
    createParty(req, res){
        const {name, hqAddress, logoUrl} = req.body;
        const values = [name, hqAddress, logoUrl]
        const party = partiesModel.createParty(values)
        party.then(rows => {
            if(rows.length > 0){
                const {id, name} = rows[0]

                return res.status(201).send({
                    status: 201,
                    data: [{
                        id,
                        name
                    }]
                })
            }else{
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    getAllParty(req, res){

        const parties = partiesModel.selectAllParty()
        parties.then(rows => {
            if(rows.length > 0){
                let data = []
                rows.map(row => {
                    let {id, name} = row
                    let logoUrl = row.logourl
                    let hqAddress = row.hqaddress
                    let cur_data = {
                        id,
                        name,
                        hqAddress,
                        logoUrl
                    }
                    data.push(cur_data)
                })

                return res.status(200).send({
                    status: 200,
                    data
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "No entry for parties yet"
                })
            }
            
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })


        
    }

    getAParty(req, res){
        const id = parseInt(req.params.id)
        if(req.user.is_admin === false){
            return res.status(401).send({
                status: 401,
                error: "You are not authorized to access this page" 
            })
        }else if(isNaN(id)){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed as parameter in the url"
            })
        }

        const party = partiesModel.selectAParty([id])
        party.then(rows => {
            if(rows.length > 0){
                const {id, name} = rows[0]
                const logoUrl = rows[0].logourl
                const data = [
                    {
                        id,
                        name,
                        logoUrl
                    }
                ]
                return res.status(200).send({
                    status: 200,
                    data
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "Party not found"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    editAParty(req, res){
        const param_id = parseInt(req.params.id);
        const param_name = req.body.name;

        const party = partiesModel.updateAParty([param_name, param_id])
        party.then(rows => {
            if(rows.length > 0){
                const {id, name} = rows[0]
                return res.status(200).send({
                    status: 200,
                    data: [{
                        id,
                        name
                    }]
                })
            }else{
                return res.status(404).send({
                    status: "404",
                    error: "Party doesn't exist"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    deleteParty(req, res){
        const id = parseInt(req.params.id)

        const party = partiesModel.deleteAParty([id])
        party.then(rows => {
            if(rows.length > 0){
                const {name} = rows[0];
                return res.status(200).send({
                    status: 200,
                    message: `${name} deleted from list of political parties`
                })
            }else{
                return res.status(404).send({
                    status: "404",
                    error: "Party doesn't exist"
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

const partyController = new PartyController();

export default partyController;
