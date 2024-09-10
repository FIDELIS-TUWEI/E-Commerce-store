const express = require("express");
const cookieParser = require("cookie-parser");
const appRoutes = require("./routes/index");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); // parse form data(urlencoded)
app.use(cookieParser());

app.disable("x-powered-by"); // disable express server fingerprinting

app.use("/api/v1", appRoutes);

module.exports = app;