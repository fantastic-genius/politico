import votesModel from "../model/votesModel"

class VoteController{
    createVote(req, res){
        const {office, candidate} = req.body
        const values = [req.user.id, office, candidate]
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

    getUserVotes(req, res){
        const values = [req.params.id]
        const votes = votesModel.getUserVotes(values)
        votes.then(rows => {
            if(rows.length > 0){
                return res.status(200).send({
                    status: 200,
                    data: rows
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "You have not made any vote"
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

const voteController = new VoteController()
export default voteController
