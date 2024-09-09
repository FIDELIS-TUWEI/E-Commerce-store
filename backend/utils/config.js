require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT;
let UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;

module.exports = {
    MONGODB_URI, PORT, UPSTASH_REDIS_URL
}