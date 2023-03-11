const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/registryuser', userCtrl.register);
router.post('/connectuser', userCtrl.login);
router.put('/putuser', userCtrl.putUser);
router.delete('/deleteuser', userCtrl.deleteUser);

module.exports = router