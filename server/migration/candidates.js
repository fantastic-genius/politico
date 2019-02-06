import {Pool} from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
    console.log("Connected to the database")
})

const createCandidatesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        candidates(
            id SERIAL PRIMARY KEY NOT NULL,
            office INT NOT NULL,
            party INT NOT NULL,
            candidate INT NOT NULL,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
            FOREIGN KEY (party) REFERENCES parties (id) ON DELETE CASCADE,
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

const dropCandidatesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS candidates'

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

export {createCandidatesTable, dropCandidatesTable}
require('make-runnable')

