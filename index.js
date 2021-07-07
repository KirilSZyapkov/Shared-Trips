const express = require('express');
const app = express();
const databaseConfig = require('./config/database');

const expressConfig = require('./config/express');
const PORT = require('./config/config');

start();

async function start() {

    await databaseConfig(app);
    expressConfig(app);

    app.listen(PORT.PORT, () => console.log(`Server is listening on port ${PORT.PORT}...`));

}