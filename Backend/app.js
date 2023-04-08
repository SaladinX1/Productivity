const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./database/db.script');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(cors());

const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);


module.exports = app;
