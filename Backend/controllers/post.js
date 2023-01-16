
const db = require('../database/db.script');


exports.allPosts = (req,res, next) => {

  const Post = `SELECT * FROM 'Post' `

    db.query(Post,(result, err) => {
        if(!result) {
            res.status(400).json({message:'Echec de la recuperation, mauvaise requête !'})
        } else {
            res.status(200).json({message: 'Posts récupérés !'})
        }
    })

}

exports.onePost = (req, res,next) => {

    const id = req.params.id;

    

}