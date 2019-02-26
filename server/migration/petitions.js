import {pool} from "../config"
import debug from "debug"

const debugg = debug('petitionsMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
})

const createPetitionsTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        petitions(
            id SERIAL PRIMARY KEY NOT NULL,
            createdOn TIMESTAMP,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            body VARCHAR NOT NULL,
            evidence VARCHAR,
            FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES offices (id) ON DELETE CASCADE
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

const dropPetitionsTable = () => {
    const queryText = 'DROP TABLE IF EXISTS petitions'

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

export {createPetitionsTable, dropPetitionsTable}
require('make-runnable')
