const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/allposts', postCtrl.allPosts);
router.get('/post', postCtrl.onePost);
router.put('/putpost', postCtrl.putPost);
router.delete('/deletepost', postCtrl.deletePost);

module.exports = router;