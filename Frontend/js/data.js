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
            <div class='fil__blog--post' data-id='${info.id}'>
                    <h1>${info.title}</h1>
                    <img src='${info.picture}' alt='Image du post'/>
                    <div class="fil__blog--post_sampleAnnounce">
                    <p>${info.message}</p>
                    </div>
                    
            </div>
            `
        }
        
        /////////////////////// GESTION RECUPERATION UNIQUE POST //////////////////////////
        document.querySelectorAll('.fil__blog--post').forEach(post => {
            post.addEventListener('click', (e) => {
            let id = post.getAttribute('data-id');
            
            fetch(`http://localhost:3000/api/post/${id}`, {
                method:'GET',
                headers: {
                    'accept':'application/json',
                    'content-type':'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
            .then(data => {return data.json()})
            .then( res => {
                for(let post of res) {
                    localStorage.setItem('post_id', post.id);
                    location.replace('/Frontend/pages/post_view.html');
                }
            })
        })
     })
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

    if(title != '' && picture != '' && message != '') {
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

   //////////////////////// POST VIEW ///////////////////////
    if(document.URL.includes('/post_view.html')) {

        const id = localStorage.getItem('post_id');
        
        //////////////// GESTION RECUPERATION ID DATA /////////////////
        fetch(`http://localhost:3000/api/post/${id}`, {
            method:'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
        .then(data => {return data.json()})
        .then(res => {

            console.log(res);

            const scanTitle = document.querySelector('.scan > h1');
            const scanPicture = document.querySelector('.scan > img');
            const scanMessage = document.querySelector('.scan > p');

            const btnOverlayDeleteScan = document.querySelector('.scan__btnScanGestion--deleteScan');
            const overlayDeleteScan = document.querySelector('.overlayDeleteScan');
            const cancelOverlayDelete = document.querySelector('.cancelDeleteScan');
            const btnDeleteScan = document.querySelector('.deleteScan');

            const btnPutScan = document.querySelector('.scan__btnScanGestion--putScan');
        
            for(let i of res) {
                scanTitle.textContent = `${i.title}`;
                scanPicture.src = `${i.picture}`;
                scanMessage.textContent = `${i.message}`;
            }

            ///////////////////// GESTION DELETE SCAN REQUEST //////////////////
            btnOverlayDeleteScan.addEventListener('click', () => {
                overlayDeleteScan.style.display = 'block'
            })
            cancelOverlayDelete.addEventListener('click', () => {
                overlayDeleteScan.style.display = 'none'
            })
            btnDeleteScan.addEventListener('click', () => {

               // const token = localStorage.getItem('token');

                fetch(`http://localhost:3000/api/deletepost/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                }).then(data => { return data.json()})
                .then(res => {
                    console.log(res);
                    alert('Le Scan a bien été supprimé !');
                    localStorage.removeItem('post_id')
                    location.replace('/Frontend/pages/fil-posts.html');
                })
            })

            ///////////////////////GESTION REQUÊTE PUT SCAN //////////////////////

            const cancelOverlayPutScan = document.querySelector('.putScanForm__cancelPutScanbtn');
            const displayOverlayPutScan = document.querySelector('.scan__btnScanGestion--putScan');
            const putScanForm = document.querySelector('.putScanForm');

            displayOverlayPutScan.addEventListener('click', () => {
                putScanForm.style.display = 'block';
            });
            cancelOverlayPutScan.addEventListener('click', () => {
                putScanForm.style.display = 'none';
            })


            putScanForm.addEventListener('submit', (e) => {
                e.preventDefault();
      

                const titleInput = document.querySelector('#titlePut').value;
                const pictureInput = document.querySelector('#picturePut').value;
                const messageInput = document.querySelector('#messagePut').value;

                let putScan = {
                    title: titleInput,
                    picture: pictureInput,
                    message: messageInput
                }

                if( titleInput != '' || pictureInput != '' || messageInput != '') {
                    
                    fetch(`http://localhost:3000/api/putpost/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(putScan),
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            'authorization': `Bearer ${token}`
                        }
                    })
                    .then( data => { return data.json()})
                    .then(res => {
                        console.log(res);
                        alert('Scan Modifié !');
                        location.reload();
                    })
                   

                } else {

                    document.querySelector('.errPutScanMsg').textContent = 'Veuillez remplir au moins un champs à modifier ...';
                    document.querySelector('.errPutScanMsg').style.color = 'red';
                    document.querySelector('.errPutScanMsg').style.fontSize = '1.2rem';
                    document.querySelector('.errPutScanMsg').style.fontWeight = 'bold';

                    setTimeout(() => {
                        document.querySelector('.errPutScanMsg').textContent = '';
                    },1800);

                }

             

            })
          
        })


      

    }