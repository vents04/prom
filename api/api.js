
const express = require('express');
const app = express();
const cors = require('cors');
const mongo = require("./db/mongo");
const indexRoute = require('./routes/index.route');
const errorHandler = require('./errors/errorHandler');

const { PORT } = require('./global');
const CodeService = require('./services/code.service');

app
    .use(cors())
    .use(express.json({
        limit: '50mb'
    }))
    .use(express.urlencoded({ extended: true, limit: '50mb' }))
    .use("/", indexRoute)
    .use(errorHandler);

mongo.connect();

(async function () {
    /*
    await CodeService.deleteCodes();
    await CodeService.generateCodes();
    */
})();

app.listen(PORT, function () {
    console.log("API server listening on port " + PORT)
})