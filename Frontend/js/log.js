    const logoutBtn = document.querySelector('.fil__logoutBtn');

    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        location.replace('../../index.html');
        
    })