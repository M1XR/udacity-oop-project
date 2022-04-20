// get Button and Form Element
const btn = document.getElementById("btn");
const form = document.getElementById("dino-compare");

// Create Grid
async function createGrid() {
  console.log("start");
  // Dino Constructor
  function Dino(dino) {
    this.species = dino.species;
    this.weight = dino.weight;
    this.height = dino.height;
    this.diet = dino.diet;
    this.where = dino.where;
    this.when = dino.when;
    this.fact = dino.fact;
    this.image = "/images/" + dino.species.toLowerCase() + ".png";
  }

  // set Dino Array
  let dinosaurs = [];

  // Fetch Dinos from JSON, create Dino Objects and push to Dino Array
  await fetch("dino.json")
    .then((response) => response.json())
    .then((data) =>
      data.Dinos.map((dino) => {
        let newDino = new Dino(dino);
        dinosaurs.push(newDino);
      })
    );

  // set Human Object
  const human = {
    image: "/images/human.png",
  };

  // Use IIFE to get human data from form
  (function createHuman() {
    // get Input values from form
    const name = document.getElementById("name").value;
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const weight = document.getElementById("weight").value;
    const diet = document.getElementById("diet").value;
    const height = inches + feet * 12; // calculate height in inches

    // set Input values into an Object
    const inputValues = {
      name,
      height,
      weight,
      diet,
    };
    // assign Input values Object to Human Object
    Object.assign(human, inputValues);
  })();

  // Dino Compare Method 1

  Dino.prototype.compareWeight = function () {
    let fact = "";
    if (this.weight > human.weight) {
      fact = `The ${this.species} is ${this.weight - human.weight} lbs havier than ${human.name}!`;
    } else if (this.weight < human.weight) {
      fact = `The ${this.species} is ${human.weight - this.weight} lighter lbs than ${human.name}!`;
    } else {
      fact = `The ${this.species} and ${human.name} have the same weight`;
    }
    return fact;
  };

  // Dino Compare Method 2

  Dino.prototype.compareHeight = function () {
    let fact = "";
    if (this.height > human.height) {
      fact = `The ${this.species} is ${this.height - human.height} inches taller than ${human.name}!`;
    } else if (this.height < human.height) {
      fact = `The ${this.species} is ${human.height - this.height} inches smaller than ${human.name}!`;
    } else {
      fact = `The ${this.species} and ${human.name} have the same height`;
    }
    return fact;
  };

  // Dino Compare Method 3

  Dino.prototype.compareDiet = function () {
    let fact = "";
    if (this.diet === human.diet.toLowerCase()) {
      fact = `Nom Nom...${human.name} likes to eat the same as ${this.species}!!!`;
    } else {
      fact = `Urgh...${human.name} and ${this.species} don't like the same food!`;
    }
    return fact;
  };

  // Dino Random Fact Method
  Dino.prototype.randomFact = function () {
    if (this.species === "Pigeon") {
      // set static Pigeon Fact
      return this.fact;
    } else {
      // get random number
      const random = Math.floor(Math.random() * 6) + 1;

      // switch over facts to display
      switch (random) {
        case 1:
          return this.where;
          break;
        case 2:
          return this.when;
          break;
        case 3:
          return this.fact;
          break;
        case 4:
          return this.compareWeight();
          break;
        case 5:
          return this.compareHeight();
          break;
        case 6:
          return this.compareDiet();
          break;
      }
    }
  };

  // Create Grid Items
  const createTile = (dino) => {
    // get main Element
    const grid = document.getElementById("grid");

    // create Grid Item and Item Elements
    const gridItem = document.createElement("div");
    const tileTitle = document.createElement("h3");
    const tileImage = document.createElement("img");
    const tileFact = document.createElement("p");
    gridItem.classList.add("grid-item");

    // append Item Elements to Grid Item
    gridItem.appendChild(tileTitle);
    gridItem.appendChild(tileImage);
    gridItem.appendChild(tileFact);

    // set Item Elements Content
    tileTitle.innerHTML = dino ? dino.species : human.name;
    tileImage.src = dino ? dino.image : human.image;
    tileImage.alt = dino ? dino.species : "Human";
    dino && (tileFact.innerHTML = dino.randomFact());

    // append Grid Item to Grid
    grid.appendChild(gridItem);
  };

  // Generate Tiles for each Dino in Array and add tiles to DOM
  dinosaurs.map((dino, index) => {
    createTile(dino);
    index === 3 && createTile();
  });

  // remove form from DOM
  form.remove();
}

// On button click, prepare and display infographic
btn.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
});
