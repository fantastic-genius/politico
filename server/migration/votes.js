import pool from "../config"
import debug from "debug"

const debugg = debug('votesMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
})

const createVotesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        votes(
            id SERIAL NOT NULL,
            createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            candidate INT NOT NULL,
            CONSTRAINT votes_constraint PRIMARY KEY(createdBy, office),
            FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
            FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE CASCADE
            )`

    pool.query(queryText)
        .then(res => {
            debugg(res)
            pool.end()
        })
        .catch(err => {
            debugg(err)
            pool.end()
        })
}

const dropVotesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS votes'

    pool.query(queryText)
        .then(res => {
            debugg(res)
            pool.end()
        })
        .catch(err => {
            debugg(err)
            pool.end()
        })
}

pool.on('remove', () => {
    debugg("Client Removed")
    process.exit(0)
})

export {createVotesTable, dropVotesTable}
require('make-runnable')

