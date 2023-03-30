
const db = require('../database/db.script');



exports.addPost = (req, res) => {

    const user_id = req.user.id;
  
    const { title, message } = req.body; 

    const picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    const addScan = `INSERT INTO Post (title, picture, message, user_id) VALUES (?, ?, ?, ?)`;

    db.query(addScan,[title, picture, message, user_id], (err, result) => {
        if(!result) {
            console.log(err);
            res.status(400).json({message: 'Mauvaise requête ! '})
        } else {
            res.status(201).json({message: 'Scan Crée !'})
        }
    })
}


exports.allPosts = (req,res, next) => {

  const Post = `SELECT * FROM 'Post' `

    db.query(Post,(err, result) => {
        if(!result) {
            res.status(400).json({message:'Echec de la recuperation, mauvaise requête !'})
        } else {
            res.status(200).json(result);
        }
    })

}

exports.onePost = (req, res,next) => {
    const id = req.params.id;

    const getOnePost = `SELECT FROM Post WHERE 'id' = ${id} `;

    db.query(getOnePost,(err, result) => {
        if(!result) {
            res.status(400).json({message: 'Mauvaise requête'})
        } else {
            res.status(200).json({message: 'Post récupéré'})
        }
    })
}


exports.deletePost = (req,res, next) => {
    const id = req.params.id;
    const deletePost = `DELETE FROM Post WHERE 'id' = ${id}`;
    
    db.query(deletePost, (err, result) => {
        if(!result) {
            res.status(400).json({message:'Mauvaise requête'});
        } else {
            res.status(200).json({message: 'Post Suprimé !'})
        }
    });
}

exports.putPost = (req, res, next) => {

    const id = req.params.id;

    const {
        message, picture
    } = req.body;

    const putPost = `UPDATE Post SET '${message}', '${picture}' WHERE 'id' = ${id}; `


    db.query(putPost, (err, result) => {
        if(!result) {
            res.status(400).json({message: 'Mauvaise requête'});
        } else {
            res.status(200).json({message: 'Post Modifié !'})
        }
    });

}