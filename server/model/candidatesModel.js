import {pool} from "../config"
import debug from "debug"

const debugg = debug('candidatesmodel:')

class CandidatesModel{

    async createCandidate(values){
        const query = `INSERT INTO
                candidates(office, party, candidate)
                values($1, $2, $3)
                RETURNING *`
        try {
            const {rows}  = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }

    async selectACandidate(candidateVal){
        const query = 'SELECT * FROM candidates WHERE candidate=$1'
        try {
            const {rows}  = await pool.query(query, candidateVal)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async selectCandidateById(idval){
        const query = 'SELECT * FROM candidates WHERE id=$1'
        try {
            const {rows}  = await pool.query(query, idval)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async selectCandidatesByOffice(officeVal){
        const query = `SELECT candidates.id, candidates.candidate AS userId, users.firstname, users.lastname, users.othername, 
                    users.passporturl, parties.name AS partyName, parties.logourl
                    FROM candidates
                    INNER JOIN users ON users.id=candidates.candidate
                    INNER JOIN parties ON parties.id=candidates.party
                    WHERE candidates.office=$1`
        try {
            const {rows}  = await pool.query(query, officeVal)
            return rows
        } catch (error) {
            debugg(error)
        }
    }
}

const candidatesModel = new CandidatesModel()
export default candidatesModel
