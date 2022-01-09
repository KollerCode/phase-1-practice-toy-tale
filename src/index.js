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
  toyFormContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    createToy(event.target.name.value, event.target.image.value);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then(function (data) {
      data.map(t => addToyInfo(t))
    });
});

function addToyInfo(toy) {
  let toyCollection = document.getElementById("toy-collection");
  const toyCard = document.createElement('div')
  toyCard.className = "card"
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  const toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar'
  toyImage.src = toy.image
  const toyLikes = document.createElement('p')
  toyLikes.className="likes"
  toyLikes.innerText = toy.likes + " Likes"
  const likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.id = toy.id
  likeButton.innerText = "Like ❤️";
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(likeButton)
  toyCollection.appendChild(toyCard)

  likeButton.addEventListener("click", (e) => {
    e.preventDefault()
    // if (e.target.className === "like-btn") {
    //   let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    //   let newLikes =currentLikes + 1
    // }
    // increaseLikeButton(toy)
  })
}
  
function createToy(name, url) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: url,
      likes: 0,
    })
  })
    .then((res) => res.json())
    .then(function(data) {
        console.log(data)
    })
}
document.getElementById("toy-collection").addEventListener("click", (e) => {
  e.preventDefault()
  if (e.target.className === "like-btn") {
    let currentLikes = parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + "likes"
    console.log(e.target.id)
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "likes": newLikes,
      }),
    })
  }
  
  // function increaseLikeButton(toy) {
  //   console.log(toy.likes)
  //   let newNumberOfLikes = toy.likes + 1;
  //   let paragraph = document.querySelector(".likes")
  //   // console.log(paragraph.innerText)
  //   // console.log(newNumberOfLikes)
  //   // console.log(toy.likes)
  //   fetch(`http://localhost:3000/toys/${toy.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       "likes": newNumberOfLikes,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((response => {
  //       // console.log(newNumberOfLikes)
  //       paragraph.innerText = `${newNumberOfLikes} likes`;
  //     }))
  // }
})