require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT;
let UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;
let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
let REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
let NODE_ENV = process.env.NODE_ENV;

module.exports = {
    MONGODB_URI, PORT, UPSTASH_REDIS_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV
}