
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
                        token: jwt.sign({id: id}, process.env.TOKEN , { expiresIn: '24h' })
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

exports.putUser = async (req, res, next) => {

    const id = req.params.id;
    const pseudo = req.body.pseudo;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(5);
        const cryptPass = await bcrypt.hash(password, salt);

        
    db.query('DELETE FROM comment WHERE pseudo_user = ?', [pseudo], (err, result) => {
        if (err) {
            console.log(pseudo);
          console.log(err);
          res.status(400).json({message: 'Mauvaise requête !'});
        } else {
          // Met à jour la ligne de la table `users`
          const putData = `UPDATE Users SET nom=?, prenom=?, pseudo=?, password=? WHERE id = ?;`;
          db.query(putData, [prenom, nom, pseudo, cryptPass, id], (err, result) => {
            if (err) {
              console.log(err);
              res.status(400).json({message: 'Mauvaise requête !'});
            } else {
              res.status(200).json({message: 'Vos données ont été modifiées', pseudoUpd: pseudo});
            }
          });
        }
      });

}

