
const jwt = require('jsonwebtoken');
const db = require('../database/db.script');
const bcrypt = require('bcrypt');

exports.register = async (req,res, next) => {

    //const {nom, prenom, pseudo, mail} = req.body;

   

   const {password: password} = req.body;

    try {
        

        const salt = await bcrypt.genSalt(5);
        const cryptPass = await bcrypt.hash(password, salt);

        const user = {
            ...req.body,
            password: cryptPass
        }

        // const request = `INSERT INTO Users ('nom','prenom','pseudo','mail','password') VALUES ('${nom}','${prenom}','${pseudo}','${mail}','${cryptPass}')`;
        const request = `INSERT INTO Users SET ?`;
       // const existMail = `SELECT * FROM Users WHERE mail = '${mail}'`;

        db.query(request, user,(err, result) => {
            if(result) {
                res.status(201).json({message: 'Données enregistrées ! Bravo !'})
            } else {
                res.status(401).json({ message: 'Email déjà pris !'})
                // db.query(request, (err, result) => {
                //     if(!err) {
                //     }
                // })    
            }
            
        })


    } catch (err) {
        res.status(400).json({message: 'Mauvaise requête !'})
    }
}



exports.login = (req, res, next) =>  {


    const requestLog = `SELECT 'email', 'password' FROM Users WHERE 'email' = ${req.body.email} ?`;
    const userPassword = `SELECT 'password' FROM Users WHERE 'password' = '${req.body.password}';`;
    const id = `SELECT 'id' FROM Users WHERE 'email' = ${req.body.email};`;

    db.query(requestLog, (err, result) => {
        if(!result) {
            res.status(401).json({message: 'utilisateur introuvable !'})
        } else {
            bcrypt.compare(req.body.password, userPassword)
            .then(valid => {
                if(!valid) {
                  return res.status(401).json({message: 'Mot de passe incorrect !'});
                } else {
                    res.status(200).json({id:id, token: jwt.sign({id: id},
                        process.env.TOKEN,
                        { expiresIn:'24h'})
                    })   
                }
            })
            .catch(res.status(500).json({message: 'Erreur serveur !'}))
        }
    })
}


exports.deleteUser = (req,res, next) => {

    const deleteUserRequest = `DELETE FROM 'Users' WHERE 'id' = ${req.params.id};`

    db.query(deleteUserRequest, (err, result => {
        if(!result) {
            res.status(500).json({message: 'Erreur Serveur !'})
        } else {
            res.status(200).json({message: 'Utilisateur supprimé !'})
        }
    }))


}

exports.putUser = (req, res, next) => {

    const id = req.params.id;
    const pseudo = req.body.pseudo;
    const email = req.body.pseudo;
    const password = req.body.password;
    const pic = req.body.picture;

    const putData = `UPDATE 'Users' SET '${pseudo}', '${email}', '${password}', '${pic}' WHERE 'id' = '${id}';`;

    db.query(putData, (err, result) => {
        if(!result) {
            res.status(400).json({message: 'Mauvaise requête !'});
        } else {
            res.status(200).json({message: 'Vos données ont été modifiées'})
        }
    })

}

