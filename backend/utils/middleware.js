const logger = require("./logger");

const requestLogger = (req, res, next) => {
    logger.info("Method:", req.method);
    logger.info("Path:", req.path);
    logger.info("Body:", req.body);
    logger.info("---");

    next();
};

const unKnownEndpoint = (req, res) => {
    res.status(400).send({ error: "Unknown Endpoint reached" });
};

module.exports = {
    requestLogger, unKnownEndpoint
};