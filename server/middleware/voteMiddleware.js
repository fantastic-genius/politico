import usersModel from "../model/usersModel"
import officesModel from "../model/officesModel"
import candidatesModel from "../model/candidatesModel"
import votesModel from "../model/votesModel"
class VoteMiddleWare{
    createVoteMiddleware(req, res, next){
        if(!req.body.createdBy || !(req.body.createdBy).trim()){
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
        }else if(isNaN(parseInt(req.body.createdBy))){
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

        const vote = votesModel.selectAVote([req.body.createdBy, req.body.office])
        vote.then(rows => {
            if(rows.length > 0){
                return res.status(403).send({
                    status: 403,
                    error: "You can't vote for this office again. You have already voted for this political office"
                })
            }else{
                const user = usersModel.selectUserById([req.body.createdBy])
                user.then(rows => {
                    if(rows.length === 0){
                        return res.status(403).send({
                            status: 404,
                            error: "This user doesn't exist"
                        })
                    }else{
                        const office = officesModel.selectAnOffice([req.body.office])
                        office.then(rows => {
                            if(rows.length === 0){
                                return res.status(403).send({
                                    status: 404,
                                    error: "This office doesn't exist"
                                })
                            }else{
                                 const candidate = candidatesModel.selectCandidateById([req.body.candidate])
                                 candidate.then(rows => {
                                    if(rows.length === 0){
                                        return res.status(403).send({
                                            status: 404,
                                            error: "This candidate doesn't exist"
                                        })
                                    }else{
                                        next()
                                    }
                                 })
                             }
                         })
                     }
                 })
            }
        })
    }
}

const voteMiddleWare = new VoteMiddleWare()
export default voteMiddleWare
