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
  if (weightRatio > 1) {
    return this.addFact(
      `${this.species} weighs ${weightRatio} times more than you.`
    );
  }
  if (weightRatio < 1) {
    return this.addFact(
      `You weigh ${weightRatio} times more than ${this.species}.`
    );
  }
  return this.addFact(`You weigh the same as ${this.species}!`);
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
  if (heightRatio > 1) {
    return this.addFact(
      `${this.species} is ${heightRatio} times taller than you.`
    );
  }
  if (heightRatio < 1) {
    return this.addFact(
      `You are ${heightRatio} times more taller ${this.species}.`
    );
  }
  return this.addFact(`You are the same height as ${this.species}!`);
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
  const humanDiet = human.diet.toLowerCase();
  const article = humanDiet === "omnivore" ? "an" : "a";

  if (humanDiet === this.diet.toLowerCase()) {
    return this.addFact(
      `You are ${article} ${humanDiet} and ${this.species} is too.`
    );
  }
  return this.addFact(
    `You are ${article} ${humanDiet} but ${this.species} is ${this.diet}.`
  );
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
 * @description Adds the Grid to page when compare me button is clicked.
 * @param  {Object} dinos
 */
function compareMeClicked(dinos, human) {
  // document.querySelector("#dino-compare").style.display = "none";
  toggleCompareFormDisplay();

  const grid = document.querySelector("#grid");
  // grid.style.display = "flex";
  toggleGridDisplay();
  grid.innerHTML = null;

  dinos.forEach((dino, index) => {
    if (index === 4) {
      let item = createGridItem(human);
      grid.appendChild(item);
    }

    if (dino.species !== "Pigeon") {
      dino.compareDiet(human);
      dino.compareHeight(human);
      dino.compareWeight(human);
    }

    const item = createGridItem(dino);
    grid.appendChild(item);
  });
  // document.querySelector("#btn-tryAgain").style.display = "block";
  toggleTryAgainButton();
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
  const gridItemDiv = document.createElement("div");
  gridItemDiv.className = "grid-item";

  const speciesDiv = document.createElement("h3");
  speciesDiv.innerText = animal instanceof Dino ? animal.species : animal.name;
  gridItemDiv.appendChild(speciesDiv);

  const image = document.createElement("img");
  image.src = `../images/${
    animal instanceof Dino ? animal.species.toLowerCase() : "human"
  }.png`;
  gridItemDiv.appendChild(image);

  if (animal instanceof Dino) {
    const fact = document.createElement("p");
    const randomInt = getRandomInt(animal.facts.length - 1);
    fact.innerText = animal.facts[randomInt];
    gridItemDiv.appendChild(fact);
  }
  return gridItemDiv;
}

function resetCompareForm() {
  document.querySelector("#name").value = null;
  document.querySelector("#feet").value = null;
  document.querySelector("#inches").value = null;
  document.querySelector("#weight").value = null;
  document.querySelector("#diet").selectedIndex = 0;
}

function toggleGridDisplay() {
  const gridDisplay = document.querySelector("#grid").style.display;
  // show or hide grid
  console.log(gridDisplay);
  if (gridDisplay) {
    document.querySelector("#grid").style.display = "flex";
  } else {
    document.querySelector("#grid").style.display = "none";
  }
}
function toggleCompareFormDisplay() {
  // show or hide the compare form
  // document.querySelector("#dino-compare").style.display = "block";
  const compareFormDisplay = document.querySelector("#dino-compare").style
    .display;
  console.log(compareFormDisplay);
  if (!document.querySelector("#dino-compare").style.display) {
    document.querySelector("#dino-compare").style.display = "block";
  } else {
    document.querySelector("#dino-compare").style.display = "none";
  }
}

function toggleTryAgainButton() {
  // console.log(document.querySelector("#btn-tryAgain").style.display);
  const tryAgainButtonDisplay = document.querySelector("#btn-tryAgain").style
    .display;
  if (!tryAgainButtonDisplay) {
    document.querySelector("#btn-tryAgain").style.display = "block";
  } else {
    document.querySelector("#btn-tryAgain").style.display = "none";
  }
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
      event.preventDefault();

      /**
       * @description Gets user input from html form.
       * @returns {Object} Human object created from user input.
       */
      const human = (function getHuman() {
        const name = document.querySelector("#name").value;
        const heightFeet = parseFloat(document.querySelector("#feet").value);
        const heightInches = parseFloat(
          document.querySelector("#inches").value
        );
        const weight = parseFloat(document.querySelector("#weight").value);
        const diet = document.querySelector("#diet").value;
        const height = heightFeet * 12 + heightInches;
        return new Human(name, height, weight, diet);
      })();

      if (dinos.length) {
        compareMeClicked(dinos, human);
      }
    });

  document.querySelector("#btn-tryAgain").addEventListener("click", () => {
    resetCompareForm();
    toggleGridDisplay();
    toggleCompareFormDisplay();
    toggleTryAgainButton();
  });
  const feetInput = document.querySelector("#feet");
  const inchesInput = document.querySelector("#inches");

  feetInput.addEventListener("change", (event) => {
    if (event.target.value) {
      inchesInput.removeAttribute("required");
    }
  });
  inchesInput.addEventListener("change", (event) => {
    if (event.target.value) {
      feetInput.removeAttribute("required");
    }
  });
})();
