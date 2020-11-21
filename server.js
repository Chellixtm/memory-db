const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./query');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist/'));
app.use(cors());
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({extended:true})
);




app.get('/', (req, res) => {
    res.json({info:'Node.js, Express, and Postgres API'});
});
app.listen(PORT, () => {
    console.log('App running.');
});