import {offices} from "../db/db"
import candidatesModel from "../model/candidatesModel"
import officesModel from "../model/officesModel"
import votesModel from "../model/votesModel"
class OfficeController{
    createOffice(req, res){
        const body = req.body
        const {type, name} = body
        const values = [type, name]
        const office = officesModel.createOffice(values)

        office.then(rows => {
            if(rows.length > 0){
                const {id, type, name} = rows[0]
                const data = [{
                    id,
                    type,
                    name
                }]

                return res.status(201).send({
                    status: 201,
                    data
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

    getAllOffice(req, res){
        
        const offices = officesModel.selectAllOffice()
        offices.then(rows => {
            if(rows.length > 0){
                return res.status(200).send({
                    status: 200,
                    data: rows
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

    getAnOffice(req, res){
        const office_id = parseInt(req.params.id)

        if(isNaN(office_id)){
            return res.status(400).send({
                status: 400,
                error: "An integer is required to be passed in"
            })
        }

        const office = officesModel.selectAnOffice([office_id])
        office.then(rows => {
            if(rows.length > 0){
                const {id, type, name} = rows[0]

                return res.status(200).send({
                    status: 200,
                    data: [{
                        id,
                        type,
                        name
                    }]
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "Office not found"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })   
    }

    createCandidate(req, res){
        const {office, party} = req.body
        const user_id = req.params.id
        const values = [office, party, user_id]
        const candidates = candidatesModel.createCandidate(values)
        candidates.then(rows => {
            if(rows.length > 0){
                return res.status(201).send({
                    status: 201,
                    data: [{
                        office: rows[0].office,
                        user: rows[0].candidate
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

    getOfficeVotes(req, res){
        const votes = votesModel.getVotesByOffice([req.params.id])
        const candidates = candidatesModel.selectCandidatesByOffice([req.params.id])
        

        candidates.then(rows => {
            if(rows.length > 0){
               return rows 
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "No candidate exist for this office"
                })
            }
        }).then(candidates => {
            let result = []
            candidates.map((candid, index) => {
                let candidate = candid.id
                votes.then(vts => {
                    if(vts.length > 0){
                        var count = 0
                        vts.map(vote => {
                            if(vote.candidate === candidate){
                                count++
                            }
                        })
                        let output = {
                            office: req.params.id,
                            candidate: candidate,
                            result: count
    
                        }
                        result.push(output)
                    }else{
                        return res.status(404).send({
                            status: 404,
                            error: "No votes was found for this office"
                        })
                    }
                    if(index >= candidates.length - 1 ){
                        return res.status(200).send({
                            status: 200,
                            data: result
                        })
                    }
                    
                }).catch(error => {
                    return res.status(500).send({
                        status: 500,
                        error: "Something went wrong, cannot process your request. Pleae try again"
                    })
                })
            })
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }
    
}

const officeController = new OfficeController()
export default officeController
