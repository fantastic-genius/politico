import {pool} from "../config"
import debug from "debug"

const debugg = debug('partiesMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
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
            debugg(res)
            pool.end()
        })
        .catch(err => {
            debugg(err)
            pool.end()
        })
    
    
}

const dropPartiesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS parties'

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

export {createPartiesTable, dropPartiesTable}
require('make-runnable')

