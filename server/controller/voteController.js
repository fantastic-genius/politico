import votesModel from "../model/votesModel"

class VoteController{
    createVote(req, res){
        const {createdBy, office, candidate} = req.body
        const values = [createdBy, office, candidate]
        const vote = votesModel.createVote(values)
        vote.then(rows => {
            if(rows.length > 0){
                return res.status(201).send({
                    status: 201,
                    data: [{
                        office: rows[0].office,
                        candidate: rows[0].candidate,
                        voter: rows[0].createdby
                    }]
                })
            }else{
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }
        }).catch(error =>{
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })

    }
}

const voteController = new VoteController()
export default voteController
