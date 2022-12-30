const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./database/db.script');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

module.exports = app;
