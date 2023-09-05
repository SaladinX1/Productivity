const mysql = require('mysql8');
require('dotenv').config(); 


const db = mysql.createConnection({
    host:process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB,
    user: process.env.ROOT, 
    password: process.env.DBPASS
   
});

 function initialize() {
    
    db.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    });

   

                db.query(`CREATE TABLE IF NOT EXISTS Users
                (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    nom VARCHAR(255) NOT NULL,
                    prenom VARCHAR(255) NOT NULL,
                    pseudo VARCHAR(255) NOT NULL UNIQUE,
                     mail VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL,
                      admin BOOLEAN);`
                      ,
                    function( err , result) {
                    if (err) throw err;
                    })

                    db.query(`CREATE TABLE IF NOT EXISTS Post
                                (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                     title VARCHAR(255) NOT NULL,
                                      picture VARCHAR(255),
                                       message VARCHAR(255),
                                        user_id INT NOT NULL,
                                       FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
                                      )`, 

                    function( err , result) {
                        if (err) throw err;
                    })

                    db.query(`CREATE TABLE IF NOT EXISTS Comment
                         (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            pseudo_user VARCHAR(255),
                            FOREIGN KEY (pseudo_user) REFERENCES Users(pseudo) ON DELETE CASCADE,
                             message VARCHAR(255),
                             post_id INT NOT NULL,
                            FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE);`, 
                             
                        function( err , result) {
                        if (err) throw err;
                      })

                      db.query(`CREATE TABLE IF NOT EXISTS likes (
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  post_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE);`, 
                          
                     function( err , result) {
                     if (err) throw err;
                   })

            

             db.query("USE bwxkmkzh3yqtqyuhytic", function(err, result) {
                if (err) throw err;
            })
            
            }


            initialize();


            module.exports = db;