import {pool} from "../config"
import debug from "debug"

const debugg = debug("petitionsmodel:")

class PetitionsModel{
    async createPetition(values){
        const query = `INSERT INTO
                petitions(createdby, office, body, evidence)
                values($1, $2, $3, $4)
                RETURNING *`
        
        try {
            const {rows} = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }
}

const petitionsModel = new PetitionsModel()
export default petitionsModel
