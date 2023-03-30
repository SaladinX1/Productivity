const data_userProfile = document.querySelector('.info_user__data');
const user_id = localStorage.getItem('user_id');




window.addEventListener('load', () => {
    if(document.URL.includes('profil.html')) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/getuser/${user_id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            console.log(data);
            for(let info_user of data) {
                data_userProfile.innerHTML += `   
                <h3>Nom: ${info_user.nom}</h3>
                <h3>Prénom: ${info_user.prenom}</h3>
                <h3>Mail: ${info_user.mail}</h3>
                <h3>Pseudo: ${info_user.pseudo}</h3> 
                <div class="info_user__btn_gestion">
                <button class="info_user__btn_gestion--deleteAccount" onclick="dispDelete()">Supprimer mon compte</button>
                <button class="info_user__btn_gestion--putAccount" onclick="displayPutForm()">Modifier infos</button>
            </div>
                `;
            }
        })
    }
})



///////////////// requête Delete User //////////////////////////
function deleteAccount() {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/deleteuser/${user_id}`, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type' : 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);
        alert('Votre compte à été suprimé !');
        location.replace('/index.html');
        
    })

}


//////////////  POST ///////////////////


////////////////  AJOUT SCAN POST REQUEST //////////////////
function sendScan() {
    const token = localStorage.getItem('token');
    ///// Récupération champs post Scan et gestion post ///////////
    let title = document.querySelector('#title').value;
    let picture = document.querySelector('#picture').files[0];
    let message = document.querySelector('#message').value;

    let data = new FormData();
    data.append('title', title);
    data.append('picture', picture);
    data.append('message', message);


    fetch(`http://localhost:3000/api/addpost`, {
        method: 'POST',
        body: data,
        headers : {
            'authorization' : `Bearer ${token}`
        } 
       
    })
    .then(data => {return data.json()})
    .then(res => {
        console.log(res);

        alert('Scan crée ! Bien joué !')
        location.reload();
    })
}