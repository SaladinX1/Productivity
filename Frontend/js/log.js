    const logoutBtn = document.querySelector('.fil__logoutBtn');

    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        location.replace('../../index.html');
        
    })

    window.addEventListener('load', () => {
        if(!document.URL.includes('index.html')) {
            let token = localStorage.getItem('token');
            if (!token) {
                alert('Veuillez vous connecter, merci.. (Accès non autorisée)');
                location.replace('/index.html');
            }
        }
    })