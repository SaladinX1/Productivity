const db = require('../database/db.script');



const Post = db.query(`CREATE TABLE IF NOT EXISTS Post
                                (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                     title VARCHAR(255) NOT NULL,
                                      picture VARCHAR(255),
                                       message VARCHAR(255))`, 
function( err , result) {
    if (err) throw err;
    console.log("Table Post crée");
})


module.exports = Post;