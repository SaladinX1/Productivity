const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');

// destination du fichier
const upload = multer({ dest: '/images' }); 

//app.post('/api/addpost', auth, , postCtrl.addPost);

router.get('/allposts',auth,  postCtrl.allPosts);
router.get('/post/:id',auth, postCtrl.onePost);
router.post('/addpost', auth, upload.single('picture'), postCtrl.addPost);
router.put('/putpost',auth, postCtrl.putPost);
router.delete('/deletepost',auth, postCtrl.deletePost);

module.exports = router;