const blog = document.querySelector('.fil__blog');
const overlayPostScan = document.querySelector('.fil__overlayPost');
const btnDisplayOverlay = document.querySelector('.fil__addPostBtn');
const btnCancelOverlay = document.querySelector('#btnCancelPost');


    fetch('http://localhost:3000/api/allposts', {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'    
        }
    })
    .then(res => { return res.json()})
    .then(data => {

        console.log(data);
        // blog.innerHTML += `
        // <div class='post'>
        //         <
        // </div>
        // `
    })

    btnDisplayOverlay.addEventListener('click', () => {
        overlayPostScan.style.display = 'block';
    })

    btnCancelOverlay.addEventListener('click', () => {
        overlayPostScan.style.display = 'none';
    })