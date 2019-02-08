import pool from "../config"
import debug from "debug"

const debugg = debug('usersmodel:')
class UsersModel{
    async createUser(values){
        const query = `INSERT INTO 
                users(firstname, lastname, othername, email, password, phoneNumber, isAdmin)
                values($1, $2, $3, $4, $5, $6, $7)
                RETURNING *`
        
        try {
            const {rows} = await pool.query(query, values)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }


    async selectAllUsers(){
        const query = 'SELECT * FROM users'

        try {
            const {rows} = await pool.query(query)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }

    async selectUserById(idval){
        const query = 'SELECT * FROM users WHERE id=$1'

        try {
            const {rows} = await pool.query(query, idval)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }

    async selectAUser(value){
        const query = 'SELECT * FROM users WHERE email=$1'

        try {
            const {rows} = await pool.query(query, value)
            return rows
        } catch (error) {
            debugg(error)
        }
        
    }


}

const usersModel = new UsersModel()
export default usersModel
