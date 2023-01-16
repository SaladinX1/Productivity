const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/registry', userCtrl.register);
router.post('/connect', userCtrl.login);
router.put('/putdata', userCtrl.putUser);
router.delete('/deleteu', userCtrl.deleteUser);