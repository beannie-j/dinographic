"use strict";
/**
 * @param  {number} height
 * @param  {number} weight
 * @param  {string} diet
 */
function Animal(height, weight, diet) {
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

/**
 * @param  {string} name
 * @param  {number} height
 * @param  {number} weight
 * @param  {number} diet
 */
function Human(name, height, weight, diet) {
  this.name = name;
  Animal.call(this, height, weight, diet);
}

/**
 * @param  {string} species
 * @param  {number} height
 * @param  {number} weight
 * @param  {string} diet
 * @param  {string} where
 * @param  {string} when
 * @param  {string} fact
 */
function Dino(species, height, weight, diet, where, when, fact) {
  Animal.call(this, height, weight, diet);
  this.species = species;
  this.where = where;
  this.when = when;
  this.facts = fact ? [fact] : [];
  this.fact = fact;
}

/**
 * @param  {string} fact
 */
Dino.prototype.addFact = function (fact) {
  this.facts.push(fact);
};

/**
 * @description Compares weight of Dinosaur object and Human object.
 * @param  {object} human
 * @returns {string} fact
 */
Dino.prototype.compareWeight = function (human) {
  if (this.species === "Pigeon") {
    return;
  }
  const humanWeight = human.weight;
  const weightRatio = (this.weight / humanWeight).toFixed(1);
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

/**
 * @description Compares height of Dinosaur object and Human object.
 * @param  {object} human
 * @returns {string} fact
 */
Dino.prototype.compareHeight = function (human) {
  if (this.species === "Pigeon") {
    return;
  }
  const humanHeight = human.height;
  const heightRatio = (this.height / humanHeight).toFixed(1);
  let fact;
  if (heightRatio > 1) {
    fact = `${this.species} is ${heightRatio} times taller than you.`;
    this.addFact(fact);
    return fact;
  }
  if (heightRatio < 1) {
    fact = `You are ${heightRatio} times more taller ${this.species}.`;
    this.addFact(fact);
    return fact;
  }
  fact = `You are the same height as ${this.species}!`;
  this.addFact(fact);
  return fact;
};

/**
 * @description Compares diet of Dinosaur object and Human object.
 * @param  {object} human
 * @returns {string} fact
 */
Dino.prototype.compareDiet = function (human) {
  if (this.species === "Pigeon") {
    return;
  }
  const humanDiet = human.diet;
  const article = humanDiet === "omnivore" ? "an" : "a";

  let fact;
  if (humanDiet === this.diet) {
    fact = `You are ${article} ${humanDiet} and ${this.species} is too.`;
    this.addFact(fact);
    return fact;
  }

  fact = `You are ${article} ${humanDiet} but ${this.species} is ${this.diet}.`;
  this.addFact(fact);
  return fact;
};

/**
 * @description Fetches Dinosaur data from dino.json
 * @returns {Array} Array of Dino objects
 */
function fetchDinoData() {
  let arr = [];
  return fetch("../dino.json")
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
      return arr;
    })
    .catch((error) => {
      return console.log(error.message);
    });
}

/**
 * @description Gets user input from html form.
 * @returns {Object} Human object created from user input.
 */
function getHuman() {
  const name = document.querySelector("#name").value;
  const heightFeet = parseFloat(document.querySelector("#feet").value);
  const heightInches = parseFloat(document.querySelector("#inches").value);
  const weight = parseFloat(document.querySelector("#weight").value);
  const diet = document.querySelector("#diet").value;
  const height = heightFeet * 12 + heightInches;
  return new Human(name, height, weight, diet);
}

/**
 * @description Adds the Grid to page when compare me button is clicked.
 * @param  {Object} dinos
 */
function compareMeClicked(dinos) {
  let counter = 0;

  const human = getHuman();

  document.querySelector("#dino-compare").style.display = "none";
  const grid = document.querySelector("#grid");

  dinos.forEach((dino) => {
    if (counter === 4) {
      let item = createGridItem(human);
      grid.appendChild(item);
    }

    dino.compareDiet(human);
    dino.compareHeight(human);
    dino.compareWeight(human);

    const item = createGridItem(dino);
    grid.appendChild(item);
    counter++;
  });

  let buttonDiv = document.createElement("div");
  const tryAgainButton = document.createElement("button");
  tryAgainButton.id = "btn-tryAgain";
  tryAgainButton.innerHTML = "Try again";
  buttonDiv.appendChild(tryAgainButton);
  grid.appendChild(buttonDiv);
}

/**
 * @description Returns a random number within range of 0 and max number.
 * @param  {number} max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * @param  {Object} animal
 * @returns {Object} Grid item to be added to Grid.
 */
function createGridItem(animal) {
  let gridItemDiv = document.createElement("div");
  gridItemDiv.className = "grid-item";

  if (animal instanceof Dino) {
    let speciesDiv = document.createElement("h3");
    speciesDiv.innerText = animal.species;
    let image = document.createElement("img");
    image.src = `../images/${animal.species.toLowerCase()}.png`;
    let fact = document.createElement("p");
    const randomInt = getRandomInt(animal.facts.length - 1);
    fact.innerText = animal.facts[randomInt];
    gridItemDiv.appendChild(speciesDiv);
    gridItemDiv.appendChild(image);
    gridItemDiv.appendChild(fact);

    return gridItemDiv;
  }
  if (animal instanceof Human) {
    let speciesDiv = document.createElement("h3");
    speciesDiv.innerText = animal.name;
    let image = document.createElement("img");
    image.src = `../images/human.png`;
    gridItemDiv.appendChild(speciesDiv);
    gridItemDiv.appendChild(image);
    return gridItemDiv;
  }
  return gridItemDiv;
}

(function () {
  let dinos = [];
  /**
   * @description IFFE functions that fetches dinos data from dino.json on page load.
   * @param  {} "load"
   */
  window.addEventListener("load", async () => {
    dinos = await fetchDinoData();
  });
  /**
   * @description Listens to form submit event on main page.
   * @param  {} "#dino-compare"
   */
  document
    .querySelector("#dino-compare")
    .addEventListener("submit", (event) => {
      // event is only used for this,
      // so it is cleaner to move it here
      event.preventDefault();
      if (dinos.length) {
        compareMeClicked(dinos);
      }
    });
})();

document.querySelector("#btn-tryAgain").addEventListener("click", () => {
  document.querySelector("#grid").style.display = "none";
});
