const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./database/db.script');
const userRoutes = require('./routes/user');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


app.use('/api', userRoutes);

module.exports = app;
