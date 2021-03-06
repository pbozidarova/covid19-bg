// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, err => {
    console.log('Listening');

});