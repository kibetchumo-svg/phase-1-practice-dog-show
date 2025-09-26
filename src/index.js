document.addEventListener("DOMContentLoaded", () => {
  const dogForm = document.getElementById("dog-form");
  const tableBody = document.getElementById("table-body");

  let currentDogId = null;

  function fetchDogs() {
    fetch("http://localhost:3000/dogs")
      .then((res) => res.json())
      .then((dogs) => renderDogs(dogs));
  }

  function renderDogs(dogs) {
    tableBody.innerHTML = ""; 
    dogs.forEach((dog) => renderDog(dog));
  }

  function renderDog(dog) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button class="edit-btn">Edit</button></td>
    `;

    tr.querySelector(".edit-btn").addEventListener("click", () => {
      dogForm.name.value = dog.name;
      dogForm.breed.value = dog.breed;
      dogForm.sex.value = dog.sex;
      currentDogId = dog.id; 
    });

    tableBody.appendChild(tr);
  }

  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!currentDogId) return; 
    const updatedDog = {
      name: dogForm.name.value,
      breed: dogForm.breed.value,
      sex: dogForm.sex.value,
    };

    fetch(`http://localhost:3000/dogs/${currentDogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDog),
    })
      .then((res) => res.json())
      .then(() => {
        fetchDogs(); 
        dogForm.reset();
        currentDogId = null;
      });
  });

  fetchDogs();
});
