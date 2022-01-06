let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(response => {
    console.log(response)
	    response.forEach((toy) => {
        addToyInfo(toy)
    })
  })
})

function addToyInfo(toy){
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.innerHTML += `
  <div class ="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
  </div>
  `
  console.log(toy)
}

// // addEventListener('submit',____)so that when the form is submitted 
// // the new toy is persisted to the database and a new card showing the 
// // toy is added to the DOM
// // addEventListener('click', likeToy) When the button is clicked 
// // the number of likes should be updated in the database 
// // and the updated information should be rendered to the dom
