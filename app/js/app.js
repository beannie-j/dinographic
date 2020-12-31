// Create Dino Constructor

function Dino(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

function fetchDinoData() {
  let arr = [];

  fetch("../dino.json")
    .then((response) => response.json())
    .then((data) => {
      arr = data;
      console.log("then");
      console.log(arr);
      return arr;
    })
    .catch((error) => console.log(error.message))
    .finally(() => {
      console.log("Finally", arr);
    });
}

let dinos = fetchDinoData();
console.log("dinos", dinos);

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
