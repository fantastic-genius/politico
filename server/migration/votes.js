import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log("Connected to the database")
})

const createVotesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        votes(
            id SERIAL PRIMARY KEY NOT NULL,
            createdOn TIMESTAMP,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            candidate INT NOT NULL,
            FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
            FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE CASCADE
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

const dropVotesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS votes returning'

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

export {createVotesTable, dropVotesTable}
require('make-runnable')

