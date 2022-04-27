import { removeChildren } from'../utils/index.js'

const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

const loadedPokemon = [];

async function loadPokemon(offset = 0, limit = 25) {
  const pokeData = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  for (const nameAndUrl of pokeData.results) {
    const pokemon = await getAPIData(nameAndUrl.url);
    const simplifiedPokemon = {
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      name: pokemon.name,
      types: pokemon.types,
      abilities: pokemon.abilities,
      moves: pokemon.moves.slice(0, 3),
    };
    loadedPokemon.push(simplifiedPokemon);
    populatePokeCard(simplifiedPokemon);
  }
}

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
  }
}

const header = document.querySelector("header");
const loadButton = document.createElement('button')
loadButton.textContent = 'Load Pokemon'
header.appendChild(loadButton)
loadButton.addEventListener('click', async () => {
  await loadPokemon(0, 250);
})

const newButton = document.createElement("button");
newButton.textContent = "New Pokemon";
header.appendChild(newButton);
newButton.addEventListener("click", () => {
  const pokeName = prompt("What is the name of your new Pokemon?", "Drizzydon");
  const pokeHeight = prompt("What is the Pokemon's height?", 20);
  const pokeWeight = prompt("What is the Pokemon's weight?", 1000);
  const pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comma-separated list)"
  );
  const pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types separated by a space)"
  );
  // need to also collect 3 moves from the user to put into my moves property
  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes)
    //need to get an array of moves added here
  );
  console.log(newPokemon);
  populatePokeCard(newPokemon);
});


function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return {
      ability: { name: abilityName },
    };
  });
}

function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return {
      type: { name: typeName },
    };
  });
}

//TODO: makeMovesArray(spaced or comma string)

const pokeGrid = document.querySelector(".pokeGrid");

function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  pokeCard.appendChild(populateCardFront(pokemon));
  // pokeCard.appendChild(populateCardBackTypes(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";

  const pokeType1 = pokemon.types[0].type.name;
  getPokeTypeColor(pokeType1);
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType1));

  const pokeImg = document.createElement("img");
  if (pokemon.id > 9000) {
    // load local image
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;

  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities";
  pokeBack.appendChild(label);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  
  pokeBack.appendChild(abilityList);
  return pokeBack;
}

//Above add types list item.

function getPokeTypeColor(pokeType) {
  let color;
  //if(pokeType === "grass") color = '#00FF00'
  switch (pokeType) {
    case "grass":
      color = "#78C850";
      break;
    case "fire":
      color = "#F08030";
      break;
    case "water":
      color = "#6890F0";
      break;
    case "bug":
      color = "#A8B820";
      break;
    case "normal":
      color = "#A8A878";
      break;
    case "flying":
      color = "#A890F0";
      break;
    case "poison":
      color = "#A040A0";
      break;
    case "electric":
      color = "#F8D030";
      break;
    case "psychic":
      color = "F85888";
      break;
    case "ground":
      color = "E0C068";
      break;
    default:
      color = "#888888";
  }
  return color;
}

function getPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type);
}

const typeSelector = document.querySelector('#type-select')
typeSelector.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
  if(event.target.value === '--Please choose a Pokemon type--') {
    loadedPokemon.forEach((singleLoadedPokemon) => {
      populatePokeCard(singleLoadedPokemon)})
    return
  }
  const pokemonByType = getPokemonByType(usersTypeChoice)
  removeChildren(pokeGrid) // cleared out the grid from all pokemon
  // now just loop through the filtered array and populate
  pokemonByType.forEach((eachSinglePokemon) => populatePokeCard
  (eachSinglePokemon))
})