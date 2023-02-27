const registerForm = document.querySelector('.signup');
const loginForm = document.querySelector('.signin');



function dispRegister() {
    
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
}

function dispLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';

}