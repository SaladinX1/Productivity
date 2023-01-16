const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/allPosts', postCtrl.allPosts);
router.get('/post', postCtrl.onePost);