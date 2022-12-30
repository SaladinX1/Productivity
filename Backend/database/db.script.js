const mysql = require('mysql2');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Razorback2.2'
});

 function initialize() {
    
    db.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    });

    db.query("CREATE DATABASE IF NOT EXISTS Productivity;", function (err, result) {
               if (err) throw err;      
                console.log("Base de données créée !");    
             }); 

            }
            
            initialize();
            
            module.exports = db;
            