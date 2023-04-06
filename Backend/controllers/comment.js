const db = require('../database/db.script');


exports.createComment = (req, res, next) => {
    console.log(req.body);
    const {pseudo,message} = req.body;

   
    const postId = req.params.id;
    const newComment = `INSERT INTO Comment (pseudo_user, message, post_id) VALUES (?,?,?);`

    db.query(newComment,[pseudo,message,postId], (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({message: 'Mauvaise requête ! '});
        } 
        else {
            res.status(201).json({message: 'Commentaire crée !'})
        }
    })
}


exports.getComments = (req, res) => {

    const id = req.params.id;

    const sql = `SELECT * FROM Comment WHERE post_id = ?;`;
    
    db.query(sql,id, (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({message: 'Mauvaise requête !'});
        } else {
            res.status(200).json(result);
        }
    })


}

exports.getOneComment = (req, res) => {



}

exports.putComment = (req, res) => {

}

exports.deleteComment = (req, res) => {


}