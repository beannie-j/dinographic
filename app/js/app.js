// Create Dino Constructor
function Dino(species, height, weight, diet, where, when, fact) {
  this.species = species;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.facts = [];
  this.facts.push(fact);
}

Dino.prototype.addFact = function (fact) {
  this.facts.push(fact);
};

Dino.prototype.compareWeight = function (human) {
  console.log("comparing weight");
  let humanWeight = human.weight;
  let weightRatio = (this.weight / humanWeight).toFixed(1);
  let fact;
  if (weightRatio > 1) {
    fact = `${this.species} weighs ${weightRatio} times more than you.`;
    this.addFact(fact);
    return fact;
  }
  if (weightRatio < 1) {
    fact = `You weigh ${weightRatio} times more than ${this.species}.`;
    this.addFact(fact);
    return fact;
  }
  fact = `You weigh the same as ${this.species}!`;
  this.addFact(fact);
  return fact;
};

Dino.prototype.compareHeight = function (human) {
  console.log("comparing height");
};

Dino.prototype.compareDiet = function (human) {
  console.log("comparing Diet");
};

function fetchDinoData() {
  let arr = [];
  fetch("../dino.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      arr = json.Dinos.map(
        (entry) =>
          new Dino(
            entry.species,
            entry.height,
            entry.weight,
            entry.diet,
            entry.where,
            entry.when,
            entry.fact
          )
      );
      return Promise.all(arr);
    })
    .catch((error) => {
      return console.log(error.message);
    });
}

fetchDinoData().then(function (dinos) {
  console.log(dinos);
});

function getDinoArray(dinos) {
  console.log("dinos", dinos);
  return dinos;
}

function compareMeClicked(e) {
  e.preventDefault();
  let human = getHuman();
}

function getHuman() {
  let name = document.querySelector("#name").value;
  let heightFeet = parseFloat(document.querySelector("#feet").value);
  let heightInches = parseFloat(document.querySelector("#inches").value);
  let weight = parseFloat(document.querySelector("#weight").value);
  let diet = parseFloat(document.querySelector("#diet").value);
  let height = heightFeet * 12 + heightInches;
  return new Human(name, height, weight, diet);
}

// Create Dino Objects

// Create Human Object
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Use IIFE to get human data from form

(function () {
  document.querySelector("#btn").addEventListener("click", compareMeClicked);
})();

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
