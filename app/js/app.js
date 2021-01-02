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
  let humanHeight = human.height;
  let heightRatio = (this.height / humanHeight).toFixed(1);
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

Dino.prototype.compareDiet = function (human) {
  let humanDiet = human.diet;
  const article = humanDiet === "omnivore" ? "an" : "a";

  if (humanDiet === this.diet) {
    fact = `You are ${article} ${humanDiet} and ${this.species} is too.`;
    this.addFact(fact);
    return fact;
  }

  fact = `You are ${article} ${humanDiet} but ${this.species} is ${this.diet}.`;
  this.addFact(fact);
  return fact;
};

function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

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

function getHuman() {
  let name = document.querySelector("#name").value;
  let heightFeet = parseFloat(document.querySelector("#feet").value);
  let heightInches = parseFloat(document.querySelector("#inches").value);
  let weight = parseFloat(document.querySelector("#weight").value);
  let diet = document.querySelector("#diet").value;
  let height = heightFeet * 12 + heightInches;
  return new Human(name, height, weight, diet);
}

async function compareMeClicked(e) {
  let counter = 0;
  e.preventDefault();

  let human = getHuman();
  let dinos = await fetchDinoData();

  document.querySelector("#dino-compare").style.display = "none";
  let grid = document.querySelector("#grid");

  for (let dino of dinos) {
    if (counter === 4) {
      console.log(human);
      let item = createHumanGridItem(human);
      grid.appendChild(item);
    }

    dino.compareDiet(human);
    dino.compareHeight(human);
    dino.compareWeight(human);
    let item = createDinoGridItem(dino);
    grid.appendChild(item);
    counter++;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createHumanGridItem(human) {
  let gridItemDiv = document.createElement("div");
  gridItemDiv.className = "grid-item";

  let speciesDiv = document.createElement("h3");
  speciesDiv.innerText = human.name;

  let image = document.createElement("img");
  image.src = `../images/human.png`;

  gridItemDiv.appendChild(speciesDiv);
  gridItemDiv.appendChild(image);

  return gridItemDiv;
}

function createDinoGridItem(dino) {
  let gridItemDiv = document.createElement("div");
  gridItemDiv.className = "grid-item";

  let speciesDiv = document.createElement("h3");
  speciesDiv.innerText = dino.species;

  let image = document.createElement("img");
  image.src = `../images/${dino.species.toLowerCase()}.png`;

  let fact = document.createElement("p");
  let randomInt = getRandomInt(dino.facts.length - 1);
  fact.innerText = dino.facts[randomInt];

  gridItemDiv.appendChild(speciesDiv);
  gridItemDiv.appendChild(image);
  gridItemDiv.appendChild(fact);

  return gridItemDiv;
}

(function () {
  document
    .querySelector("#dino-compare")
    .addEventListener("submit", compareMeClicked);
})();
