
const db = require('../database/db.script');



exports.addPost = (req, res) => {

    const user_id = req.user.id;
  
    const { title, message } = req.body; 

    const picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(picture);

    const addScan = `INSERT INTO Post (title, picture, message, user_id) VALUES (?, ?, ?, ?)`;

    db.query(addScan,[title, picture, message, user_id], (err, result) => {
        if(!result) {
            
            res.status(400).json({message: 'Mauvaise requête ! '})
        } else {
            res.status(201).json({message: 'Scan Crée !'})
        }
    })
}


exports.allPosts = (req,res, next) => {

  const Post = `SELECT * FROM Post `

    db.query(Post,(err, result) => {
        if(!result) {
            console.log(err);
            res.status(400).json({message:'Echec de la recuperation, mauvaise requête !'})
        } else {
            res.status(200).json(result);
        }
    })

}

exports.onePost = (req, res,next) => {
    const id = req.params.id;

    const getOnePost = `SELECT * FROM Post WHERE id =? `;

    db.query(getOnePost, id,(err, result) => {
        if(!result) {
            console.log(err);
            res.status(400).json({message: 'Mauvaise requête'})
        } else {
            res.status(200).json(result)
        }
    })
}


exports.deletePost = (req, res, next) => {

    const deletePost = `DELETE FROM Post WHERE id =? ;`;
    const id = req.params.id;

    db.query(deletePost, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Erreur lors de la suppression du post' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Le post n\'a pas été trouvé' });
        }
        res.status(200).json({ message: 'Post supprimé !' });
    });
};

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