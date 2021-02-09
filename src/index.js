
// VARIABLES
const url = 'http://localhost:3000/ramens'

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenRating = document.querySelector('#ramen-rating')
const button = document.querySelector("#btn")

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
    const ramenInfo = ramen
    // Create image tag to hold ramen image information
    const img = document.createElement('img')
    // console.log(ramen.name)
    // From here, we assign the image details 
    img.src = ramen.image
    img.alt = ramen.name 
    img.className = 'detail-image'
    img.dataset.id = ramen.id
    ramenMenu.append(img)
    img.addEventListener('click', eventFetch)

}

function eventFetch(event){ 
    let ramenImageId = event.target.dataset.id

    fetch(`http://localhost:3000/ramens/${ramenImageId}`)
    .then(response => response.json())
    .then(showRamenInfo)
    // console.log(event.target)    
}

function showRamenInfo(ramenObj){
    ramenDetail.innerHTML = ` <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
    <h2 class="name">${ramenObj.name}</h2>
    <h3 class="restaurant">${ramenObj.restaurant}</h3>`
    // <h3 class="rating">${ramenObj.rating}</h3>
    ramenRating.dataset.id = ramenObj.id
    // console.log(ramenRating)
    
    ramenRating.innerHTML = `<label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value="${ramenObj.rating}" />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramenObj.comment}</textarea>
    <input type="submit" value="Update"/>`

    ramenRating.addEventListener("submit", updateRating)

}

function updateRating(event){
    event.preventDefault()
    let ramenId = event.target.dataset.id
    // console.log(event.target.dataset)
    
    console.log(event)
    const rating = event.target.rating.value
    const comment = event.target.comment.value
    const updateObj = {rating, comment}

    fetch(`http://localhost:3000/ramens/${ramenId}`,{
    method: "PATCH", 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(updateObj)
    })
}