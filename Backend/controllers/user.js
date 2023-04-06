
const jwt = require('jsonwebtoken');
const db = require('../database/db.script');
const bcrypt = require('bcrypt');

exports.register = async (req,res, next) => {
console.log(req.body);
   const {password: password} = req.body;
    try {

        const salt = await bcrypt.genSalt(5);
        const cryptPass = await bcrypt.hash(password, salt);

        const user = {
            ...req.body,
            password: cryptPass
        }

        const request = `INSERT INTO Users SET ?`;

        db.query(request, user,(err, result) => {
            if(result) {
                res.status(201).json({message: 'Données enregistrées ! Bravo !'})
            } else {
                res.status(401).json({ message: 'Email déjà pris !'})
            }
            
        })
    } catch (err) {
        res.status(400).json({message: 'Mauvaise requête !'})
    }
}



exports.login = (req, res, next) =>  {

    const { mailConn, passwordConn } = req.body;

try {
    const sql = `SELECT id, nom, prenom, pseudo, password FROM Users WHERE mail=?`;
    db.query(sql, mailConn, (err, result) => {
        console.log('RESULT:',result);
        if (err) {
            res.status(500).json({message: 'Erreur serveur !'});
        } else if (!result[0]) {
            res.status(401).json({message: 'Utilisateur introuvable !'});
        } else {
            const user = result[0];
            bcrypt.compare(passwordConn, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({message: 'Mot de passe incorrect !'});
                } else {
                    const id = user.id;
                    const pseudo = user.pseudo;
                    res.status(200).json({
                        id: id,
                        pseudo: pseudo,
                        token: jwt.sign({id: id}, 'HARD_SECRET_TOKEN' , { expiresIn: '24h' })
                    });
                }
            })
            .catch(err => {
                 console.log(err); // Log the error to know its cause
                 res.status(500).json({message: 'Erreur serveur !'});
             });
        }
    });
} catch (err) {
    console.log(err); // Log the error to know its cause
    res.status(500).json({message: 'Erreur serveur !'});
}
}



exports.getUser = (req, res) => {

    const user_id = req.params.id;
    const sql = `SELECT * FROM Users WHERE id =?`

    db.query(sql, user_id, (err, result) => {
        
        if(err) {
            res.status(400).json({message: 'Mauvaise requête ! '})
        } 
        else {
            res.status(200).json(result);
        }

    })


}


exports.deleteUser = (req,res) => {

    const deleteUserRequest = `DELETE FROM Users WHERE id = ${req.params.id};`

    db.query(deleteUserRequest, (err, result) => {
        if(!result) {
            res.status(500).json({message: 'Erreur Serveur !'})
        } else {
            res.status(200).json({message: 'Utilisateur supprimé !'})
        }
    });


}

exports.putUser = (req, res, next) => {

    const id = req.params.id;
    const pseudo = req.body.pseudo;
    const email = req.body.pseudo;
    const password = req.body.password;
    const pic = req.body.picture;

    const putData = `UPDATE Users SET '${pseudo}', '${email}', '${password}', '${pic}' WHERE 'id' = '${id}';`;

    db.query(putData, (err, result) => {
        if(!result) {
            res.status(400).json({message: 'Mauvaise requête !'});
        } else {
            res.status(200).json({message: 'Vos données ont été modifiées'})
        }
    })

}

