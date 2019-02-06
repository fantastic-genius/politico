import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log("Connected to the database")
})

const createOfficesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        offices(
            id SERIAL PRIMARY KEY NOT NULL,
            type TEXT NOT NULL,
            name TEXT NOT NULL
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

const dropOfficesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS offices'

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

export {createOfficesTable, dropOfficesTable}
require('make-runnable')

