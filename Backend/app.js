const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./database/db.script');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

module.exports = app;
