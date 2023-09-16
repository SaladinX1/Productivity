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
        localStorage.clear();
        location.replace('/index.html');
        
    })

}


//////////////  POST ///////////////////

 if (document.URL.includes('fil-posts.html')) {

    localStorage.removeItem('post_id');
    
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

       
      
        for(let info of data) {
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

        const user_id = localStorage.getItem('user_id');

        fetch(`http://localhost:3000/api/getuser/${user_id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        .then(data => {return data.json()})
        .then(resuser => {
            console.log(resuser);
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

                 const auteur = document.querySelector('.scan > h3'); 
                    for (let i of resuser) {
                        if(i.pseudo) {
                            auteur.textContent = `Auteur: ${i.pseudo}`;
                        }
                        
                    } 
                    auteur.style.backgroundColor = 'yellowgreen';
                    auteur.style.textAlign = 'left';
                    auteur.style.width = '50%';
                    auteur.style.borderRadius = '10px';
                    auteur.style.padding = '10px';



               
                for(let obj of resuser) {
                   
                        const admin = obj.admin;
                       
                        for(let i of res) {
           
                            if(admin == true || obj.id == i.user_id ) {
                                document.querySelector('.scan__btnScanGestionA').style.display = 'block';
                            } else if( i.user_id != obj.user_id || admin == false) {
                                document.querySelector('.scan__btnScanGestionA').style.display = 'none';
                            }
                        }         
                     
                }

    
                const scanTitle = document.querySelector('.scan > h1');
                const scanPicture = document.querySelector('.scan > img');
                scanPicture.style.width = `80%`;
                const scanMessage = document.querySelector('.scan > p');
    
                const btnOverlayDeleteScan = document.querySelector('.scan__btnScanGestionA--deleteScan');
                const overlayDeleteScan = document.querySelector('.overlayDeleteScan');
                const cancelOverlayDelete = document.querySelector('.cancelDeleteScan');
                const btnDeleteScan = document.querySelector('.deleteScan');
    
            
                for(let i of res) {
                    scanTitle.textContent = `${i.title}`;
                    scanTitle.style.backgroundColor = `yellow`;
                    scanTitle.style.borderRadius = `10px`;
                    scanTitle.style.margin = '10px';

                    scanPicture.src = `${i.picture}`;
                    scanPicture.style.height = '400px';
                    scanPicture.style.borderRadius = '30px';
                    scanPicture.style.objectFit = 'cover'
                    scanPicture.style.padding = '20px'

                    scanMessage.textContent = `${i.message}`;
                    scanMessage.style.fontSize = '2.2rem';
                    scanMessage.style.backgroundColor = 'white';
                    scanMessage.style.borderRadius = '10px';
                    scanMessage.style.fontWeight = '600';
                    scanMessage.style.margin = '10px';
                    scanMessage.style.padding = '10px';
                }

                   
                //////////////////////// GESTION LIKE  POST ////////////////////

                const likeBtn = document.querySelector('.scan__btnLikeUnlike--like');

                ///////////////// LIKE /////////////////////

                likeBtn.addEventListener('click', () => {

                        ////////// POSTLIKEUSER /////////
                    let postLiked = {
                        userId: user_id,
                        postId: id
                    }
        
                      fetch(`http://localhost:3000/api/post/${id}/postLikedByUser`, {
                    method: 'POST',
                    body: JSON.stringify(postLiked),
                    headers: {
                        'accept' : 'application/json',
                        'content-type' : 'application/json',
                        'authorization' : `Bearer ${token}`
                    }
                }).then(data => {return data.json()})
                .then(res => {
                    
        
                })
        
   
                     ///// / ////////// RECUPERATION NOMBRE DE LIKE 
                     let post_id = localStorage.getItem('post_id');
                     let postId = {
                        postId: post_id
                     }

                    fetch(`http://localhost:3000/api/post/${id}/likes`, {
                        method: 'POST',
                        body: JSON.stringify(postId),
                        headers: {
                            'accept' : 'application/json',
                            'content-type' : 'application/json',
                            'authorization' : `Bearer ${token}`
                        }
                    }).then(data => {return data.json()})
                    .then( res => {

                        if (res[0].total == 0) {
                            likeBtn.classList.remove('liked');
                        }  

                        document.querySelector('.count_like').style.margin = '8px';
                        document.querySelector('.count_like').style.color = 'red';
                        document.querySelector('.count_like').textContent = `${res[0].total} `;


                        


                    })


                    let postLikeUnlike = {
                        userId: user_id,
                        postId: id,
                    }

                    fetch(`http://localhost:3000/api/post/${id}/likeunlike`, {
                        method: 'PATCH',
                        body: JSON.stringify(postLikeUnlike),
                        headers: {
                            'accept' : 'application/json',
                            'content-type' : 'application/json',
                            'authorization' : `Bearer ${token}`
                        }
                    }).then(data => {return data.json()})
                    .then( res => {

                        
                    })




                });

    
                ///////////////////// GESTION DELETE SCAN REQUEST //////////////////
                btnOverlayDeleteScan.addEventListener('click', () => {
                    overlayDeleteScan.style.display = 'block'
                })
                cancelOverlayDelete.addEventListener('click', () => {
                    overlayDeleteScan.style.display = 'none'
                })
                btnDeleteScan.addEventListener('click', () => {
    
    
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
                const displayOverlayPutScan = document.querySelector('.scan__btnScanGestionA--putScan');
                const putScanForm = document.querySelector('.putScanForm');
    
                displayOverlayPutScan.addEventListener('click', () => {
                    putScanForm.style.display = 'block';
                });
                cancelOverlayPutScan.addEventListener('click', () => {
                    putScanForm.style.display = 'none';
                })
    
    
                putScanForm.addEventListener('submit', (e) => {
                    e.preventDefault();
          
    
                    const title = document.querySelector('#titlePut').value;
                    const message = document.querySelector('#messagePut').value;
                

                    let putScan = {
                        title: title,
                        message: message
                    }
                   
                    if( title != ''  || message != '') {
                        
                        fetch(`http://localhost:3000/api/putpost/${id}`, {
                            method: 'PATCH',
                            body: JSON.stringify(putScan),
                            headers: {
                                'content-type' : 'application/json',
                                'accept': 'application/json',
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
    
            /////////////////////////// REQUEST GET COMMENTS ////////////////////////////////////////
    
            fetch(`http://localhost:3000/api/post/${id}/comments`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                })
                .then(data => { return data.json()})
                .then(res => {
                    
    
                    for(let comment of res) {
                        document.querySelector('.comments').innerHTML += `<div class='userComm' data-id='${comment.id}'>
                                                                            <span class='userAuthor'>${comment.pseudo_user}</span>:  ${comment.message}
                                                                           
                                                                            <button type="submit" class="putCommentBtn">Modifier</button>
                                                                            <button type="button" class="cancelCommentBtn">supprimer</button>
                                                                          
                                                                            <div class="userComm__putComment hidden">
                                                                            <form class="userComm__putCommen--putCommentForm">
                                                                            
                                                                            <h3>Changes d'avis, ici ! xp</h3>
                                                                            <textarea name="putCommentContent" id="putCommentContent" cols="5 " rows="3"></textarea>
                                                                            <button type="submit" class="sendPutCommentBtn" >Envoyer</button>
                                                                            </form>
                                                                            <p class='errPutComment'></p> 
                                                                            </div>
                                                                            </div> `;    
                                                                            
                                                                        }
                                                                        
                                                                       
                                                                        const putCommentBtnsElement = document.querySelectorAll('.putCommentBtn');
                                                                        const cancelPutCommentBtnsElement = document.querySelectorAll('.cancelCommentBtn');
                                                                              
                                                                              putCommentBtnsElement.forEach(putBtn => {
                                                                                putBtn.style.backgroundColor = 'lightblue';
                                                                            })
                                                                            cancelPutCommentBtnsElement.forEach(cancelBtn => {
                                                                                cancelBtn.style.backgroundColor = 'pink';
                                                                            })
                                                                            
                                                                            const userCommSections = document.querySelectorAll('.userComm');
                                                            
                                                                                    if(resuser[0].admin == true  ) {

                                     
                                                                                        userCommSections.forEach(comSection => {
                                                                                            comSection.style.display = 'block';
                                                                                            if(comSection.querySelector('.userAuthor').textContent != resuser[0].pseudo) {
                                                                                                comSection.querySelector('.putCommentBtn').style.display = 'none';
                                                                                            }
                                                                                        }) 
    
                                                                                    
                                                                                         } else if( resuser[0].admin == false ) {
                                                                                            
                                                                                           
                                                                                            userCommSections.forEach(comSection => {
                                                                                                comSection.style.display = 'block';
                                                                                                if (comSection.querySelector('.userAuthor').textContent != resuser[0].pseudo) {
                                                                                                    comSection.querySelector('.putCommentBtn').style.display = 'none';
                                                                                                    comSection.querySelector('.cancelCommentBtn').style.display = 'none';
                                                                                                 
                                                                                                } else {
                                                                                                    comSection.querySelector('.putCommentBtn').style.display = 'block';
                                                                                                    comSection.querySelector('.cancelCommentBtn').style.display = 'block';
                                                                                                }         
                                                                                            }) 
                                                                                               
                                                                                          
         
                                                                                }




                    document.querySelectorAll('.putCommentBtn').forEach(com => {
                        com.addEventListener('click', (e) => {
                            if (!document.querySelector('.userComm__putComment').classList.contains('hidden')) {
                                document.querySelectorAll('#putCommentContent').forEach(content => {
                                    content.value = '';
                                });
                                document.querySelector('.userComm__putComment').classList.add('hidden');
                            } else {
                                const target = e.target;
                                const userCommPutComment = target.parentElement.querySelector('.userComm__putComment');
                                userCommPutComment.classList.toggle('hidden');
                            }
                        });
                      });
    
                    document.querySelectorAll('.overlayAddComment__cancelCommentbtn').forEach(cancel => {
                        cancel.addEventListener('click', (e) => {
                          
                          document.querySelectorAll('#putCommentContent').forEach(content => {
                              content.value = '';
                            });
                            const userCommPutComment = e.target.parentElement;
                            userCommPutComment.classList.toggle('hidden');
                            if (userCommPutComment.classList.contains('hidden')) {
                                userCommPutComment.classList.toggle('hidden');
                            }
                        });
                      });
    
    
                      ///////////////////////////////// REQUEST PUT COMMENT  ///////////////////////////////
    
                      document.querySelectorAll('.comments').forEach(comment => {

                        comment.addEventListener('submit', (e) => {
                            e.preventDefault();
            
                            if (e.target.classList.contains('userComm__putCommen--putCommentForm')) {
                                let putComment = e.target.querySelector('#putCommentContent').value;
                                let idComment = e.target.parentElement.parentElement.getAttribute('data-id');
                                let post_id = localStorage.getItem('post_id');
                                if (putComment === '') {
                                    
                                   document.querySelectorAll('.errPutComment').forEach(errPut => {

                                    errPut.textContent = 'Veuillez écrire quelque chose ..., merci.';
                                    errPut.style.color = 'red';
                                    errPut.style.fontSize = '1.5rem';

                                     setTimeout(() => {
                                        errPut.textContent = ''
                                     }, 1800)

                                   })

                                } else {
                                  let putComObj = {
                                    comment: putComment
                                  }
                                  fetch(`http://localhost:3000/api/post/${post_id}/commentput/${idComment}`, {
                                      method: 'PUT',
                                      body: JSON.stringify(putComObj),
                                      headers: {
                                        'accept': 'application/json',
                                        'content-type': 'application/json',
                                        'authorization': `Bearer ${token}`
                                      }
                                    })
                                    .then(data => {
                                      return data.json()
                                    })
                                    .then(res => {
                                      location.reload();
                                    })
                                }
                              }

                              
                            })

                      }) 



                            //////////////////////////////  REQUEST DELETE COMMENT ///////////////////////////////////

                            document.querySelectorAll('.cancelCommentBtn').forEach( deleteBtn => {
                              deleteBtn.addEventListener('click', (e) => {
                                 e.preventDefault();
                              let idComment = e.target.parentElement.getAttribute('data-id');
                              let post_id = localStorage.getItem('post_id');
                           

                                if(confirm('Voulez-vous vraiment supprimer ce commentaire ?') == true) {

  
                                    fetch(`http://localhost:3000/api/post/${post_id}/commentdelete/${idComment}`, {
                                      method: 'DELETE',
                                      headers: {
                                          'accept': 'application/json',
                                          'content-type': 'application/json',
                                          'authorization': `Bearer ${token}`
                                      }
                                    })
                                    .then( data => { return data.json()})
                                    .then( res => {
  
                                      console.log(res);
                                      location.reload();
  
  
                                    })
                                }

                                 
                                  

                               })
                             })

                        })
    
    
        })
      } 
                

        //////////////////////////// REQUEST POST COMMENT ////////////////////////////////////////

        
        if (document.URL.includes('post_view.html')) {
            const btnOverlayComment = document.querySelector('.addCommentBtn');
            const btnCancelOverlayComment = document.querySelector('.overlayAddComment__cancelCommentbtn');
            const overlayComment = document.querySelector('.overlayAddComment');
            const formComment = document.querySelector('.overlayAddComment__commentForm');
            btnOverlayComment.addEventListener('click', () => {
                overlayComment.style.display = 'block';
            })
          
            btnCancelOverlayComment.addEventListener('click', () => {
                overlayComment.style.display = 'none';
            })

           
            
            formComment.addEventListener('submit', (e) => {
            e.preventDefault();

    
                let sendMessage = document.querySelector('#commentToAdd').value;
                let pseudo = localStorage.getItem('pseudo');
                let id = localStorage.getItem('post_id');
                let sendMsg = {
                    pseudo: pseudo,
                    message: sendMessage,
                };

                if (sendMessage == '') {
                    document.querySelector('.errAddComment').textContent = 'Veuillez écrire quelque chode merci...';
                    document.querySelector('.errAddComment').style.color = 'red'
                    document.querySelector('.errAddComment').style.fontSize = '1.5rem'
                    setTimeout(() => {
                        document.querySelector('.errAddComment').textContent = '';
                    }, 2000)
                } else {

                    fetch(`http://localhost:3000/api/post/${id}/comment`, {
                        method: 'POST',
                        body: JSON.stringify(sendMsg),
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            'authorization': `Bearer ${token}`
                        }
                    })
                    .then(data => { return data.json()})
                    .then(res => {
                        console.log(res);
                        alert('Merci de ton partages !');
                        location.reload();
                    })
                }
    
    
            });
        }





