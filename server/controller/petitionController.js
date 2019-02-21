import petitionsModel from "../model/petitionsModel"
class PetitionController{
    createPetition(req, res){
        const {office, body, evidence} = req.body
        const values = [req.user.id, office, body, evidence]

        const petition = petitionsModel.createPetition(values)
        petition.then(rows => {
            if(rows.length > 0){
                const {id, office, createdby, body, evidence} = rows[0]
                const evidences = evidence.split(",")

                return res.status(201).send({
                    status: 201,
                    data: [{
                        id,
                        office,
                        createdBy: createdby,
                        text: body,
                        evidence: evidences
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
}

const petitionController = new PetitionController()
export default petitionController
