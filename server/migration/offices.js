import pool from "../config"
import debug from "debug"

const debugg = debug('officesMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
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
            debugg(res)
            pool.end()
        })
        .catch(err => {
            debugg(err)
            pool.end()
        })
}

const dropOfficesTable = () => {
    const queryText = 'DROP TABLE IF EXISTS offices'

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

export {createOfficesTable, dropOfficesTable}
require('make-runnable')

