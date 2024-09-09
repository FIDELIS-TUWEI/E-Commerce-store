const Redis = require("ioredis");
const config = require("./config");

const client = new Redis(config.UPSTASH_REDIS_URL);
await client.set('foo', 'bar');