const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const connectDB = require("./db/MongoDB");

app.listen(config.PORT, () => {
    connectDB();
    logger.info(`Server is running on port: ${config.PORT}`);
});