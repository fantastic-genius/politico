import usersModel from "../model/usersModel"
import partiesModel from "../model/partiesModel"
import officesModel from "../model/officesModel"
import candidatesModel from "../model/candidatesModel"
import votesModel from "../model/votesModel"
import {users, parties, offices, candidates, votes} from "../db/db_seed"

const seedDatabase = () => {
    users.map(user => {
        const {firstname, lastname, othername, email, password, phoneNumber, isAdmin} = user
        const values = [firstname, lastname, othername, email, password, phoneNumber, isAdmin]
        usersModel.createUser(values)
    })

    offices.map(office => {
        const {type, name} = office
        const values = [type, name]
        officesModel.createOffice(values)
    })

    parties.map(party => {
        const {name, hqAddress, logoUrl} = party
        const values = [name, hqAddress, logoUrl]
        partiesModel.createParty(values)
    })
    
}

const seedCandidates = () => {
    candidates.map(candidat => {
        const {office, party, candidate} = candidat
        const values = [office, party, candidate]
        candidatesModel.createCandidate(values)
    })
}

const seedVotes = () => {
    votes.map(vote => {
        const {createdby, office, candidate} = vote 
        const values = [createdby, office, candidate]
        votesModel.createVote(values)
    })
}


export {seedDatabase, seedCandidates, seedVotes}

require('make-runnable')
