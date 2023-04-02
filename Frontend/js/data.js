const data_userProfile = document.querySelector('.info_user__data');
const user_id = localStorage.getItem('user_id');
const blog = document.querySelector('.fil__blog');
const overlayPostScan = document.querySelector('.fil__overlayPost');
const btnDisplayOverlay = document.querySelector('.fil__addPostBtn');
const btnCancelOverlay = document.querySelector('#btnCancelPost');
const token = localStorage.getItem('token');

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

 if (document.URL.includes('fil-posts.html')) {

    fetch('http://localhost:3000/api/allposts', {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization' : `Bearer ${token}`    
        }
    })
    .then(res => { return res.json()})
    .then(data => {

        console.log(data);

        for(let info of data ) {
            console.log(info.picture);
            blog.innerHTML += `
            <div class='fil__blog--post'>
                    <h1>${info.title}</h1>
                    <img src='${info.picture}' alt='Image du post'/>
                    <div class="fil__blog--post_sampleAnnounce">
                    <p>${info.message}</p>
                    </div>
                    
            </div>
            `
        }
    })

    btnDisplayOverlay.addEventListener('click', () => {
        overlayPostScan.style.display = 'block';
    })

    btnCancelOverlay.addEventListener('click', () => {
        overlayPostScan.style.display = 'none';
    })

 }
    


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

    if(title != '' && !picture && message != '') {
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

    } else {
        document.querySelector('.errMsgScan').style.color = 'red';
        document.querySelector('.errMsgScan').style.fontSize = '1.3rem';
        document.querySelector('.errMsgScan').style.fontWeight = 'bold';
        document.querySelector('.errMsgScan').textContent = `Veuillez remplir tous les champs, merci.`;

        setTimeout(() => {
            document.querySelector('.errMsgScan').textContent = ``;
        },1800);
    }

    }

   