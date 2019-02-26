import {pool} from "../config"
import debug from "debug"

const debugg = debug('votesmodel:')

class VotesModel{
    async createVote(values){
        const query = `INSERT INTO
                votes(createdby, office, candidate)
                values($1, $2, $3)
                RETURNING *`
        
        try {
            const {rows} = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async selectAVote(values){
        const query = 'SELECT * FROM votes WHERE createdby=$1 AND office=$2'

        try {
            const {rows} = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async getVotesByOffice(officeVal){
        const query = 'SELECT * FROM votes WHERE office=$1'

        try {
            const  {rows} = await pool.query(query, officeVal)
            return rows
        } catch (error) {
            debugg(error)
        }
    }
}

const votesModel = new VotesModel()
export default votesModel 
