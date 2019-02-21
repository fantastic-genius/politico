import pool from "../config"
import debug from "debug"

const debugg = debug('usersMigration:')

pool.on('connect', () => {
    debugg("Connected to the database")
})

const createUsersTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS 
        users(
            id SERIAL PRIMARY KEY NOT NULL,
            firstname VARCHAR NOT NULL,
            lastname VARCHAR NOT NULL,
            othername VARCHAR,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            phoneNumber VARCHAR NOT NULL,
            passportUrl VARCHAR,
            isAdmin BOOLEAN NOT NULL
            )`;

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

const dropUsersTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users'

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

export {createUsersTable, dropUsersTable}

require('make-runnable')
