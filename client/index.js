// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(express.static('public'));

//Express route handlers
app.get('/', (req, res) => {
    res.send("hey");
});

// app.get('/values/all', async (req, res) => {
//     const values = await pgClient.query('SELECT * FROM values');

//     res.send(values.rows);
// });

// app.get('/values/current', async (req, res) => {
//     redisClient.hgetall('values', (err, values) => {
//         res.send(values);
//     });
// });

// app.post('/values', async (req, res) => {
//     const index = req.body.index;
    
//     if(parseInt(index) > 40){
//         return res.status(422).send('Index too high.');
//     }

//     redisClient.hset('values', index, 'Nothing yes!');
//     redisPublisher.publish('insert', index);
//     pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
   
//     res.send({working: true});

// });

app.listen(3000, err => {
    console.log('Listening');
    
});