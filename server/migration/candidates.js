import {pool} from "../config"
import debug from "debug"

const debugg = debug('candidatesMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
})

const createCandidatesTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        candidates(
            id SERIAL UNIQUE NOT NULL,
            office INT NOT NULL,
            party INT NOT NULL,
            candidate INT NOT NULL,
            CONSTRAINT candidates_constraint PRIMARY KEY(office, candidate),
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE,
            FOREIGN KEY (party) REFERENCES parties (id) ON DELETE CASCADE,
            FOREIGN KEY (candidate) REFERENCES users (id) ON DELETE CASCADE
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

const dropCandidatesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS candidates'

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

export {createCandidatesTable, dropCandidatesTable}
require('make-runnable')

