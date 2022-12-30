const db = require('../database/db.script');



const User = db.query("CREATE TABLE IF NOT EXISTS Users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL)", function( err , result) {
    if (err) throw err;
    console.log("Table users crée");
})


module.exports = User;