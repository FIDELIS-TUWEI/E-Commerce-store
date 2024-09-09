const Redis = require("ioredis");

const client = new Redis("rediss://default:AYEIAAIjcDFkNzllOTEzMWY5YTI0ZmE1OGY5ZWJiZjI4ODc2MjZkMXAxMA@well-quagga-33032.upstash.io:6379");
await client.set('foo', 'bar');