const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(middleware.requestLogger);
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Backend Server is running!")
});

app.use(middleware.unKnownEndpoint);

module.exports = app;