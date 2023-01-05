const db = require('../database/db.script');
const User = require('./user');




const Post = db.query(`CREATE TABLE IF NOT EXISTS Post
                                (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                     title VARCHAR(255) NOT NULL,
                                      picture VARCHAR(255),
                                       message VARCHAR(255),
                                        user_id INT NOT NULL,
                                       FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
                                      )`, 

function( err , result) {
    if (err) throw err;
    console.log("Table Post crée");
})


module.exports = Post;