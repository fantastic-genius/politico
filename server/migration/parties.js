import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log("Connected to the database")
})

const createPartiesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS 
        parties(
            id SERIAL PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            hqAddress TEXT NOT NULL,
            logoUrl TEXT NOT NULL
            )`

    pool.query(queryText)
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
    
    
}

const dropPartiesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS parties'

    pool.query(queryText)
        .then(res => {
            console.log(res)
            pool.end()
        })
        .catch(err => {
            console.log(err)
            pool.end()
        })
}

pool.on('remove', () => {
    console.log("Client Removed")
    process.exit(0)
})

export {createPartiesTable, dropPartiesTable}
require('make-runnable')

