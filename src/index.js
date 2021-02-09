
// VARIABLES
const url = 'http://localhost:3000/ramens'

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenRating = document.querySelector('#ramen-rating')

fetchRamens();

// FUNCTIONS

function fetchRamens() {
    fetch(url)
    .then(response => response.json())
    .then(displayAllRamen)
}

function displayAllRamen(ramenArr) {
    ramenArr.forEach(ramen => {
        renderOneRamen(ramen)
    })
}

function renderOneRamen(ramen) {
    const image = document.createElement('img')
    console.log(ramen.name);
    image.innerHTML = ramen.image
}

// 