const registerForm = document.querySelector('.home__signup');
const loginForm = document.querySelector('.home__signin');

const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const mail = document.querySelector('#mail');
const password = document.querySelector('#password');
const pseudo = document.querySelector('#pseudo');

const singin = document.querySelector('.home__signin'); 

const signup = document.querySelector('.home__signup');


//// FONCTION DISPLAY OVORLAY SIGNIN ET SIGNUP

function dispRegister() {
    
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

function dispLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';

}


let validationForm = {
    nomValid : false,
    prenomValid: false,
    pseudoValid: false,
    mailValid: false,
    passwordValid: false
}


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
        
        
        
    const registerClient = {
       
       nom : document.querySelector('#nom').value,
       prenom : document.querySelector('#prenom').value,
       pseudo : document.querySelector('#pseudo').value,
       mail : document.querySelector('#mail').value,
       password : document.querySelector('#password').value,

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
               alert(`Vous êtes maintenant inscrit ! Bravo 😃 ! Pensez à vous connecter !`  )
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


let mailInp = document.querySelector('#mailConn').value;
let passInp = document.querySelector('#passwordConn').value;
const mailErr = document.querySelector('.mailErr');
const passwordErr = document.querySelector('.passwordErr');

singin.addEventListener('submit', (e) => {
e.preventDefault();

//if(  mailInp != ' ' && passInp != ' ' ) {


        const loginUserInfo = {
            mailConn : document.querySelector('#mailConn').value,
            passwordConn : document.querySelector('#passwordConn').value
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
        
             const id = res.id;
             const token = res.token;
             console.log(id, token);

             localStorage.setItem('user_id', id);
             sessionStorage.setItem('user_id', id);
             localStorage.setItem('token', token);
             sessionStorage.setItem('token', token);

             
             alert('Connexion réussie ! 👌')

            //  let name = res.name;
            //  let admin = res.admin;
        
         
        //      if(token === undefined) {
        //          alert(`Une erreur a été repérée dans votre saisie.  \b\r \b\r information(s) incorrect(es) 😥! \b\r \b\r réessayez merci​`)
        //  } else  {
           //  alert('Vous êtes maintenant connecté 👌 !');
            //  localStorage.setItem('id', id);
            //  localStorage.setItem('token', token);
            //  localStorage.setItem('name', name);
            //  localStorage.setItem('admin', admin);
        
            //  sessionStorage.setItem('id', id);
            //  sessionStorage.setItem('token', token);
            //  sessionStorage.setItem('name', name);
            //  sessionStorage.setItem('admin', admin);
        
             
              window.location.replace('/Frontend/pages/fil-posts.html');
              
         //}                
        })
        })
        .catch( err => { console.log(err) });

    // } else if (mailInp == ' '){

    //     mailErr.style.color = 'red';
    //     mailErr.textContent = ' Veuillez entrer votre mail, merci...';
    //     document.querySelector('#mailConn').style.border = '1px solid red';

    //     setTimeout(() => {
    //         mailErr.textContent = '';
    //         document.querySelector('#mailConn').style.border = '';
    //     }, 3000)


    //  } else if(passwordErr == ' ') {

    //     passwordErr.style.color = 'red';
    //     passwordErr.textContent = 'Entrez un mot de passe valide, merci...';
    //     document.querySelector('#passwordConn').style.border = '1px solid red';

    //     setTimeout(() => {
    //         passwordErr.textContent = '';
    //     })

    // }

});
