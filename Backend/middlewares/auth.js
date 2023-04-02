const jwt = require('jsonwebtoken');
const db = require('../database/db.script');
//const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'HARD_SECRET_TOKEN');
        const selectAuthUser = `SELECT * FROM Users WHERE id = ?`;
        
        db.query(selectAuthUser, verifyToken.id, (err, result) => {
            if (!result) {
                res.status(401).json({message: 'Unauthorized'});
            } else {
                req.user = result[0];
                next();
            }
        });
    } 
      catch (error) {
      console.log(error);  
      res.status(401).json({message: 'Unauthorized'});
    }
};



