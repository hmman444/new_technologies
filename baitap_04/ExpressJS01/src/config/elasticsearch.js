const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const esClient = new Client({
    node: process.env.ES_URL,
    auth: {
        username: process.env.ES_USER,
        password: process.env.ES_PASS
    }
});

module.exports = { esClient };