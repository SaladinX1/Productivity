const jwt  = require('jsonwebtoken');
const db = require('../database/db.script');


module.exports = (req, res, next) => {

try {

    const token = req.headers.authorization.split(' ')[1];
    const verifyToken = jwt.verify(token, process.env.TOKEN);
    req.auth = verifyToken.id;
    const selectAuthUser = `SELECT 'id' FROM 'Users' WHERE 'id' = ${req.auth}`;

    db.query(selectAuthUser, (err, result) => {
        if(!result) {
            res.status(401).json({message :' requête non autorisé !'})
        } else {
            req.user = selectAuthUser;
            next();
        }
    })


} catch {

        return res.json(400).json({
            error: new Error('la requête est invalide !')
        })



}

};



