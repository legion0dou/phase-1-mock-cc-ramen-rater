// write your code here
// index.js
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramenData => {
        ramenData.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.addEventListener('click', () => displayRamenDetails(ramen));
          ramenMenu.appendChild(img);
        });
      });
  });
  function displayRamenDetails(ramen) {
    const ramenDetail = document.getElementById('ramen-detail');
    ramenDetail.innerHTML = `
      <img src="${ramen.image}" alt="${ramen.name}">
      <h2>${ramen.name}</h2>
      <h3>${ramen.restaurant}</h3>
      <h4>Rating: ${ramen.rating}</h4>
      <p>${ramen.comment}</p>
    `;
  }
  document.getElementById('new-ramen').addEventListener('submit', addNewRamen);

function addNewRamen(event) {
  event.preventDefault();
  const newRamen = {
    image: document.getElementById('new-image').value,
    name: document.getElementById('new-name').value,
    restaurant: document.getElementById('new-restaurant').value,
    rating: document.getElementById('new-rating').value,
    comment: document.getElementById('new-comment').value,
  };

  // Send a POST request to add the new ramen
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRamen),
  })
    .then(response => response.json())
    .then(ramen => {
      // Add the new ramen image to the menu
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => displayRamenDetails(ramen));
      document.getElementById('ramen-menu').appendChild(img);
    });

  // Clear the form
  event.target.reset();
}
