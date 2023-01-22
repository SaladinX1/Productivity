const db = require('../database/db.script');



const Comment = db.query(`CREATE TABLE IF NOT EXISTS Comment
                         (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                             message VARCHAR(255),
                             post_id INT NOT NULL,
                            FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE)`, 
                             
    function( err , result) {
    if (err) throw err;
    console.log("Table Comment crée");
})


module.exports = Comment;