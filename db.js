require('dotenv').config(); // Load environment variables .env
const {Pool} = require('pg')

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

pool.on('connect', (stream)=>{
    console.log('database connected successfully.');
})

pool.on('error', (stream)=>{
    console.log('ERROR !!!', stream.message)
})

module.exports = pool