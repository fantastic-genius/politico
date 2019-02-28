import usersModel from "../model/usersModel"
import officesModel from "../model/officesModel"
import candidatesModel from "../model/candidatesModel"
import votesModel from "../model/votesModel"
class VoteMiddleWare{
    createVoteMiddleware(req, res, next){

        if(!req.user && !req.user.id){
            return res.status(400).send({
                status: 400,
                error: "User not provided"
            })
        }else if(!req.body.office || !(req.body.office).trim()){
            return res.status(400).send({
                status: 400,
                error: "Political office not provided"
            })
        }else if(!req.body.candidate || !(req.body.candidate).trim()){
            return res.status(400).send({
                status: 400,
                error: "Candidate not provided"
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
        }else if(isNaN(parseInt(req.body.candidate))){
            return res.status(400).send({
                status: 400,
                error: "Integer required but String was passed as office"
            })
        }

        const vote = votesModel.selectAVote([req.user.id, req.body.office])
        vote.then(rows => {
            if(rows.length > 0){
                return res.status(403).send({
                    status: 403,
                    error: "You can't vote for this office again. You have already voted for this political office"
                })
            }else{
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
                                 const candidate = candidatesModel.selectCandidateById([req.body.candidate])
                                 candidate.then(rows => {
                                    if(rows.length === 0){
                                        return res.status(404).send({
                                            status: 404,
                                            error: "This candidate doesn't exist"
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

    getUserVotesMiddleware(req, res, next){
        if(!req.params.id){
            return res.status(400).send({
                status: 400,
                error: "User id not provided"
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

const voteMiddleWare = new VoteMiddleWare()
export default voteMiddleWare
