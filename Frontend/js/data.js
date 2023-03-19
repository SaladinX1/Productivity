const data_userProfile = document.querySelector('.info_user__data');
const user_id = localStorage.getItem('user_id');

window.addEventListener('load', () => {


    if(document.URL.includes('profil.html')) {

        fetch(`http://localhost:3000/api/getuser/${user_id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
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
                
                
                `;
            }

           

        })

    }


})