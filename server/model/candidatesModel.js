import pool from "../config"

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
            console.log(error)
        }
        
    }

    async selectACandidate(candidateVal){
        const query = 'SELECT * FROM candidates WHERE candidate=$1'
        try {
            const {rows}  = await pool.query(query, candidateVal)
            return rows
        } catch (error) {
            console.log(error)
        }
    }

    async selectCandidateById(idval){
        const query = 'SELECT * FROM candidates WHERE id=$1'
        try {
            const {rows}  = await pool.query(query, idval)
            return rows
        } catch (error) {
            console.log(error)
        }
    }

    async selectCandidatesByOffice(officeVal){
        const query = 'SELECT * FROM candidates WHERE office=$1'
        try {
            const {rows}  = await pool.query(query, officeVal)
            return rows
        } catch (error) {
            console.log(error)
        }
    }
}

const candidatesModel = new CandidatesModel()
export default candidatesModel
