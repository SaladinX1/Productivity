const registerForm = document.querySelector('.home__signup');
const loginForm = document.querySelector('.home__signin');



function dispRegister() {
    
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

function dispLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';

}