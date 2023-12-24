const container = document.getElementById('container');
const inputField = document.getElementById('input-field');
const searchBtn = document.getElementById('search-button');
const inputData = document.getElementById('input-field');
let photos = [];
let orientation = 'portrait';

// log the data
function displayPhotos () {
    photos.results.forEach( item => {
        const image = document.createElement('img');
        image.src = item.urls.small;
        // creating image container
        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');
        leftContainer.appendChild(image);
        // creating image info container
        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');
        // creating data in right container

        // creating download / info section
        const buttons = document.createElement('div');
        buttons.classList.add('btn-container');
        // creating the info button
        const infoBtn = document.createElement('button');
        infoBtn.classList.add('info-button');
        const infoUrl = document.createElement('a');
        infoUrl.textContent = 'Details';
        infoUrl.href = item.links.html;
        infoUrl.target = '_blank';
        infoBtn.appendChild(infoUrl);
        buttons.appendChild(infoBtn);
        // creating the download button
        const downloadBtn = document.createElement('button');
        downloadBtn.classList.add('download-button');
        const downloadUrl = document.createElement('a');
        downloadUrl.textContent = 'Download';
        downloadUrl.href = `${item.links.download}&force=true`;
        downloadUrl.download = 'Image';
        downloadBtn.appendChild(downloadUrl);
        buttons.appendChild(downloadBtn);
        // append buttons to right container
        rightContainer.appendChild(buttons);
        // creating the holding container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image');
        imageContainer.appendChild(leftContainer);
        imageContainer.appendChild(rightContainer);
        container.appendChild(imageContainer);
    })
}

// fetch data from Unsplash
async function getImages() {
    const apiKey = 'ROnCWmhMKQ0LEaM7RmLU5bpyhWCujckAvBIwvrtIL8o';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${inputField.value}&orientation=${orientation}&client_id=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    photos = data;
    displayPhotos();
}

searchBtn.addEventListener('click', ()=> {
    container.textContent = '';
    getImages();
})