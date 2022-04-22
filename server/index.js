const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//Postgress Client setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG connection.'))

pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS recency (resource VARCHAR PRIMARY KEY, updatedon DATE)")
        .catch((err) => console.error(err));
});

//Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

//Express route handlers
app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/resource', async (req, res) => {
    let resource_key = req.query.resource_key;
    let resourceUpdateDate = await pgClient.query('SELECT * FROM recency WHERE resource = ($1)', [resource_key]);

    res.send(resourceUpdateDate.rows)
});

app.get('/resource/requested', async (req, res) => {
    let resource_key = req.query.resource_key;
    let resourceUpdateDate = await pgClient.query('SELECT * FROM recency WHERE resource = ($1)', [resource_key]);

    res.send(resourceUpdateDate.rows)
})

app.post('/resource/requested', async (req, res) => {
    let resource_key = req.body.resource_key;
    let isResourceExisting = await (await pgClient.query('SELECT * FROM recency WHERE resource = ($1)', [resource_key])).rowCount > 0;

    if (!isResourceExisting) {
        await pgClient.query('INSERT INTO recency (resource) VALUES($1)', [resource_key]);
    }

    await pgClient.query(`UPDATE recency SET updatedon=($1) WHERE resource = ($2)`, [new Date(), resource_key]);
    let resourceUpdateDate = await pgClient.query('SELECT * FROM recency WHERE resource = ($1)', [resource_key]);

    res.send([resourceUpdateDate.rows]);
})

app.post('/getdataset', async (req, res) => {
    let resource_key = req.body.resource_key;
    let label = req.body.label;
    let from = new Date(req.body.from);
    let to = new Date(req.body.to);

    let tableName = `table_${resource_key}_` + label.split(' ').join('_').replace(/-/g, '').replace('+', '');;

    let fromDate = `${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`
    let toDate = `${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`

    let dataCreated = await pgClient.query(`SELECT * FROM ${tableName} WHERE markedOnDate BETWEEN '${fromDate}' AND '${toDate}' ORDER BY markedOnDate`);

    res.send(dataCreated.rows)
});

app.post('/dataset', async (req, res) => {
    let resource_key = req.body.resource_key;
    let label = req.body.label;
    let tableName = `table_${resource_key}_` + label.split(' ').join('_').replace(/-/g, '').replace('+', '');;
    // let tableName = 'table_' + req.body.data.tableName.split(' ').join('_').replace(/-/g, '').replace('+', '');
    let data = req.body.data;

    await pgClient.query(`CREATE TABLE IF NOT EXISTS ${tableName} (markedOnDate DATE, value VARCHAR)`);

    data.forEach(async (row) => {
        await pgClient.query(`INSERT INTO ${tableName} (markedOnDate, value) VALUES('${row.t}', '${row.y}')`);
    });

    let dataCreated = await pgClient.query(`SELECT * FROM ${tableName}`);

    res.send([dataCreated.rows])
});

app.post('/dataset-labels', async (req, res) => {
    let datasetTitle = req.body.resource_key;
    let datasetLabels = req.body.datasetLabels;

    await pgClient.query(`CREATE TABLE IF NOT EXISTS dataset_labels (dataset VARCHAR, label VARCHAR)`);
    await pgClient.query(`DELETE from dataset_labels WHERE dataset = '${datasetTitle}'`);

    datasetLabels.forEach(async (label) => {
        await pgClient.query(`INSERT INTO dataset_labels (dataset, label) VALUES('${datasetTitle}', '${label}')`);
    });

    let dataCreated = await pgClient.query(`SELECT * FROM dataset_labels WHERE dataset = '${datasetTitle}'`);

    res.send([dataCreated.rows])
});

app.get('/dataset-labels', async (req, res) => {
    let datasetTitle = req.query.resource_key;
    let dataCreated = await pgClient.query(`SELECT * FROM dataset_labels WHERE dataset = '${datasetTitle}'`);

    res.send([dataCreated.rows])
});

app.listen(5000, err => {
    console.log('Listening');
});
