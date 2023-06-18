const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const db = require('./database/db.script');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Ajoutez PATCH à la liste des méthodes autorisées
}));

const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// const user = db.query(`SELECT * FROM Users WHERE id = ${6}`, (err, result) => {
//     if (!result) {
//       console.log("Cet Utilisateur ne figure pas dans la base de données !");
//     } else {
//       const userData = result[0];
//      // console.log(userData);
//       if (userData) {
//         generateAccessToken(userData);
//         console.log(generateAccessToken(userData));
//     } else {
//         console.log("L'objet utilisateur est vide ou non valide.");
//     }
//     }
//   });

//   console.log();
  
//   function generateAccessToken(user) {
//     return jwt.sign(user, process.env.TOKEN, { expiresIn: '1800s' });
// }

  //console.log(generateAccessToken(user));

//  function generateRefreshToken(user) {
//   return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '1y'})
//  };


  // app.post('api/refreshToken', (req, res) => {

  //   const token = req.headers.authorization.split(' ')[1];
  //       const verifyToken = jwt.verify(token, process.env.TOKEN);
  //       const selectAuthUser = `SELECT * FROM Users WHERE id = ?`;
        
  //       db.query(selectAuthUser, verifyToken.id, (err, result) => {
  //           if (!result) {
  //               res.status(401).json({message: 'Unauthorized'});
  //           } else {
  //               delete req.body.iat;
  //               delete req.body.exp;
  //               const refreshedToken = gene
  //           }
     

  //   })

  // })


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, HEAD, PATCH');
    next();
});




 app.use('/images',express.static(path.join(__dirname, 'images')));


app.use('/api', userRoutes);

app.use('/api', postRoutes);

app.use('/api', commentRoutes);

module.exports = app;






