import pool from "../config"
import debug from "debug"

const debugg = debug('officesmodel:')
class OfficesModel{

    async createOffice(values){
        const query = `INSERT INTO 
                offices(type, name)
                values($1, $2)
                RETURNING *`

        try {
            const {rows} = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async selectAnOffice(idval){
        const query = 'SELECT * FROM offices WHERE id=$1'

        try {
            const {rows} = await pool.query(query, idval)
            return rows
        } catch (error) {
            debugg(error)
        }
    }

    async selectAllOffice(){
        const query = 'SELECT * FROM offices'

        try {
            const {rows} = await pool.query(query)
            return rows
        } catch (error) {
            debugg(error)
        }
    }
}

const officesModel = new OfficesModel()
export default officesModel
