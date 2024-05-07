require('dotenv').config();

let PORT = process.env.PORT;
let DB_HOST = process.env.DB_HOST;
let DB_USER = process.env.DB_USER;
let DB_PASSWORD = process.env.DB_PASSWORD;
let DATABASE = process.env.DATABASE;

module.exports = {
    PORT, DB_HOST, DB_USER, DB_PASSWORD, DATABASE
};