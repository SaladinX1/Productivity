const registerForm = document.querySelector('.home__signup');
const loginForm = document.querySelector('.home__signin');

const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const mail = document.querySelector('#mail');
const password = document.querySelector('#password');
const pseudo = document.querySelector('#pseudo');

const nomPut = document.querySelector('#nomPut');
const prenomPut = document.querySelector('#prenomPut');
const mailPut = document.querySelector('#mailPut');
const passwordPut = document.querySelector('#passwordPut');
const pseudoPut = document.querySelector('#pseudoPut');

const singin = document.querySelector('.home__signin'); 
const signup = document.querySelector('.home__signup');


const mailErr = document.querySelector('.mailErr');
const passwordErr = document.querySelector('.passwordErr');


const btndisplayPutUser = document.querySelector('.info_user__btn_gestion--putAccount');
const btnCancelPutForm = document.querySelector('.btn__cancelPut');

const btnDisplayPanelDeleteUser = document.querySelector('.info_user__btn_gestion--deleteAccount');
const btnCancelPanelDeleteUser = document.querySelector('#delete_user--cancel');


let validationForm = {
    nomValid : false,
    prenomValid: false,
    pseudoValid: false,
    mailValid: false,
    passwordValid: false
}

function dispRegister() { 
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

function dispLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
}

function displayPutForm() {
    document.querySelector('#info_user--put').style.display = 'block';
}
function cancelPutForm() {
    document.querySelector('#info_user--put').style.display = 'none';
}

function dispDelete() {
    document.querySelector('.info_user--delete').style.display = 'block';
}

function cancelDelete() {
    document.querySelector('.info_user--delete').style.display = 'none';
}


//window.addEventListener('load', () => {

const uri =  'profil.html' || 'fil-posts.html';

if(!document.URL.includes(uri)) {


//// FONCTION DISPLAY OVORLAY SIGNIN ET SIGNUP //////



nom.addEventListener('change', (e) => {
    let nomTest = e.target.value;

    if (/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(nomTest) == false) {

        validationForm.nomValid = false;
        document.querySelector('#nomErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques !";
       let errorInput = document.querySelector('#nom');
        errorInput.classList.add("border");
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorName = document.querySelector("#nomErrMsg");
        errorName.style.color = "red";

    } else {

        validationForm.nomValid = true;
        document.querySelector('#nomErrMsg').textContent = "✅";
         let errorName = document.querySelector('#nom');
         errorName.classList.add('border');
         errorName.style.border = " 2px solid green";
         errorName.style.marginBottom = '0px';

    }
})

prenom.addEventListener('change' , (e) => {
    let prenomTest = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTest) == false) {

        validationForm.prenomValid = false;
        document.querySelector('#prenomErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#prenom');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#prenomErrMsg");
        errorPrenom.style.color = "red";

    } else {

        validationForm.prenomValid = true;
        document.querySelector('#prenomErrMsg').textContent = "✅";
        let errorInput = document.querySelector('#prenom');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid green"
        errorInput.style.marginBottom = '0px';
    }
})

pseudo.addEventListener('change' , (e) => {
    let prenomTest = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTest) == false) {

        validationForm.pseudoValid = false;
        document.querySelector('#prenomErrMsg').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#prenom');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#prenomErrMsg");
        errorPrenom.style.color = "red";

    } else {

        validationForm.pseudoValid = true;
        document.querySelector('#pseudoErrMsg').textContent = "✅";
        let errorInput = document.querySelector('#pseudo');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid green"
        errorInput.style.marginBottom = '0px';
    }
})

mail.addEventListener('change' , (e) => {

    let emailTest = e.target.value

    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailTest) == false) {

        validationForm.mailValid = false;
        document.querySelector('#mailErrMsg').textContent = " Veuillez entrer un email valide"
        let errorInput = document.querySelector('#mail')
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        let errorMail = document.querySelector('#mailErrMsg');
        errorMail.style.color = 'red';

    } else {

        validationForm.mailValid = true;
        let errorInput = document.querySelector('#mailErrMsg')
        errorInput.textContent = "✅";
        let errorMail = document.querySelector('#mail');
        errorMail.classList.add('border');
        errorMail.style.border = "2px solid green";
    }
})


password.addEventListener('change', (e) => {

    let passTest = e.target.value;

    if(/^[A-Za-z0-9][A-Za-z0-9_ ]{0,40}$/g.test(passTest) == false) {

        validationForm.passwordValid = false;
        document.querySelector('#passwordErrMsg').textContent = "Veuillez entrez seulemtn des caractères alphanumérique valide, sans espace ou cacactères spéciaux s'il vous plaît";
        let errorInput = document.querySelector('#password');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid red';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsg");
        passError.style.color = "red"

    } else {
        validationForm.passwordValid = true;
        let errorInput = document.querySelector('#password');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid green';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsg");
        passError.textContent = "✅";
    }
})

/////////// REQUETE FETCH POUR SIGN UP USER ///////////

signup.addEventListener('submit', (e) => {
e.preventDefault();

let lockMsg;

if ( validationForm.nomValid == true && validationForm.prenomValid == true && validationForm.mailValid == true && validationForm.pseudoValid == true && validationForm.passwordValid == true) {
    
        let admin;
        let pseudo = document.querySelector('#pseudo').value;
          document.querySelector('#pseudo').value = 'AdminRH' ? admin = 1 : admin = 0;
        
    const registerClient = {
       
       nom : document.querySelector('#nom').value,
       prenom : document.querySelector('#prenom').value,
       pseudo : pseudo,
       mail : document.querySelector('#mail').value,
       password : document.querySelector('#password').value,
       admin: admin
   }
   
           fetch(`http://localhost:3000/api/registryuser`, {
               method : "post",
               body : JSON.stringify(registerClient),
               headers :  {
                   'Content-Type' : 'application/json',
                   'Accept' : 'application/json'
               },
           })
           .then( (res) => {
            console.log(res);

            if (res.admin) {
                alert('Bienvenue Administrateur !');
            } else 
            {  
                alert(`Vous êtes maintenant inscrit ! Bravo 😃 ! Pensez à vous connecter !`  )
            }
            
            location.reload();
           }
           )
           .catch( (err) => {
               alert('Une erreur est survenue :( !' + err)
               })
           let el = document.createElement('div');
           el.innerHTML = '';

           lockMsg = false;

} else {

 if(lockMsg == false) {
       
   el = document.createElement('div');
   let el2 = document.querySelector('#signup');
   el2.appendChild(el);
   el.classList.add('error');
   el.style.color = 'red';
   el.style.padding = 'top : 15px';
   el.textContent = "";
   el.textContent = "Merci de correctement remplir tous les champs d'informations s'il vous plaît ...";

   lockMsg = true;
          }
    }

});


singin.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let mailInp = document.querySelector('#mailConn').value;
    let passInp = document.querySelector('#passwordConn').value;
if(  mailInp != '' && passInp != '' ) {


        const loginUserInfo = {
            mailConn : mailInp,
            passwordConn : passInp
        }
        
        fetch(`http://localhost:3000/api/connectuser`, {
                    method : "post",
                    body : JSON.stringify(loginUserInfo),
                    headers :  {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json'
                    },
        }).then( data => {
         data.json()
         .then( res => {
             console.log(res);
             const token = res.token;
             const pseudo = res.pseudo;
             
             
             if(token == undefined) {
                 alert('Une erreur à été repérée dans la saisie du mot de passe ou de votre mail, réessayez, merci !');
                } else {
                    const id = res.id;
                    localStorage.setItem('user_id', id);
                    sessionStorage.setItem('user_id', id);
                    localStorage.setItem('token', token);
                    sessionStorage.setItem('token', token);
                    localStorage.setItem('pseudo', pseudo);
                    alert('Connexion réussie ! 👌')
                window.location.replace('/Frontend/pages/fil-posts.html');
            }
        
        })
        })
        .catch( err => { console.log(err) });

     } else {
        mailErr.style.color = 'red';
        mailErr.textContent = ' Veuillez entrer votre mail, merci...';
        document.querySelector('#mailConn').style.border = '1px solid red';

        passwordErr.style.color = 'red';
        passwordErr.textContent = 'Entrez un mot de passe valide, merci...';
        document.querySelector('#passwordConn').style.border = '1px solid red';
        
        setTimeout(() => {
            mailErr.textContent = '';
            document.querySelector('#mailConn').style.border = '';
            document.querySelector('#passwordConn').style.border = '';
            passwordErr.textContent = '';
            mailErr.textContent = '';
        }, 2400)
       

     } 
});
}

//} 


if (document.URL.includes('profil.html')) {

   


nomPut.addEventListener('change', (e) => {
    let nomTestput = e.target.value;

    if (/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(nomTestput) == false) {

        validationForm.nomValid = false;
        document.querySelector('#nomErrMsgPut').textContent = "Veuillez seulement entrer des caractères Alphabétiques !";
       let errorInput = document.querySelector('#nomPut');
        errorInput.classList.add("border");
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorName = document.querySelector("#nomErrMsgPut");
        errorName.style.color = "red";

    } else {

        validationForm.nomValid = true;
        document.querySelector('#nomErrMsgPut').textContent = "✅";
         let errorName = document.querySelector('#nomPut');
         errorName.classList.add('border');
         errorName.style.border = " 2px solid green";
         errorName.style.marginBottom = '0px';

    }
})

prenomPut.addEventListener('change' , (e) => {
    let prenomTestPut = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(prenomTestPut) == false) {

        validationForm.prenomValid = false;
        document.querySelector('#prenomErrMsgPut').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#prenomPut');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#prenomErrMsgPut");
        errorPrenom.style.color = "red";

    } else {

        validationForm.prenomValid = true;
        document.querySelector('#prenomErrMsgPut').textContent = "✅";
        let errorInput = document.querySelector('#prenomPut');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid green"
        errorInput.style.marginBottom = '0px';
    }
})

pseudoPut.addEventListener('change' , (e) => {
    let pseudoTestPut = e.target.value;

    if(/^[A-Za-z][A-Za-z0-9_ ]{0,40}$/.test(pseudoTestPut) == false) {

        validationForm.pseudoValid = false;
        document.querySelector('#pseudoErrMsgPut').textContent = "Veuillez seulement entrer des caractères Alphabétiques";
        let errorInput = document.querySelector('#pseudoPut');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        errorInput.style.marginBottom = '0px';
        let errorPrenom = document.querySelector("#pseudoErrMsgPut");
        errorPrenom.style.color = "red";

    } else {

        validationForm.pseudoValid = true;
        document.querySelector('#pseudoErrMsgPut').textContent = "✅";
        let errorInput = document.querySelector('#pseudoPut');
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid green"
        errorInput.style.marginBottom = '0px';
    }
})

mailPut.addEventListener('change' , (e) => {

    let emailTestPut = e.target.value

    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailTestPut) == false) {

        validationForm.mailValid = false;
        document.querySelector('#mailErrMsgPut').textContent = " Veuillez entrer un email valide"
        let errorInput = document.querySelector('#mailPut')
        errorInput.classList.add('border');
        errorInput.style.border = "2px solid red";
        let errorMail = document.querySelector('#mailErrMsgPut');
        errorMail.style.color = 'red';

    } else {

        validationForm.mailValid = true;
        let errorInput = document.querySelector('#mailErrMsgPut')
        errorInput.textContent = "✅";
        let errorMail = document.querySelector('#mailPut');
        errorMail.classList.add('border');
        errorMail.style.border = "2px solid green";
    }
})


passwordPut.addEventListener('change', (e) => {

    let passTestPut = e.target.value;

    if(/^[A-Za-z0-9][A-Za-z0-9_ ]{0,40}$/g.test(passTestPut) == false) {

        validationForm.passwordValid = false;
        document.querySelector('#passwordErrMsgPut').textContent = "Veuillez entrez seulemtn des caractères alphanumérique valide, sans espace ou cacactères spéciaux s'il vous plaît";
        let errorInput = document.querySelector('#passwordPut');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid red';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsgPut");
        passError.style.color = "red"

    } else {
        validationForm.passwordValid = true;
        let errorInput = document.querySelector('#passwordPut');
        errorInput.classList.add('border');
        errorInput.style.border = '2px solid green';
        errorInput.style.marginBottom = '0px';
        let passError = document.querySelector("#passwordErrMsgPut");
        passError.textContent = "✅";
    }
})

document.querySelector('#info_user--put').addEventListener('submit', (e) => {
    e.preventDefault();
    // Ajouter le code de traitement du formulaire ici
});

};
