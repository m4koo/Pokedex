//GENERAL USAGE
async function fetchPokeUrl(urlPath){
    let url = `https://pokeapi.co/api/v2/pokemon/${urlPath}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson;
}

async function getPokemons() {
    let limit = `?limit=151` //limit 151 for gen 1
    let pokemonList = await fetchPokeUrl(limit);
    return pokemonList;
}

async function getPokemonSprite(i){
    let sprite = await fetchPokeUrl(i + 1); 
    return sprite['sprites']['other']['official-artwork']['front_default'];
}

async function getPokemonTypes(i) { //returns types array
  let types = await fetchPokeUrl(i+1);
  return types['types'];
}


//SECTION: pokemon cards on main page
async function showPokeCard() {
  let list = await getPokemons();
  let pokemon = list['results'];
    for (let i = 0; i < pokemon.length; i++) {
      const name = pokemon[i]['name'];
      let sprite = await getPokemonSprite(i); 
      let types = await getPokemonTypes(i);
      generatePokemonCard(i, name, sprite, types);
  }
}

function pokeCardStyling(types, id) { //specific styling for the different types
  setPokeCardBackground(types, id);
  setBoxShadow(types, id);
}

function setPokeCardBackground(types, id){
  document.getElementById(`id-${id + 1}`).style.backgroundImage = `url('img/svg/types/${types[0]['type']['name']}.svg')`;
}

function setBoxShadow(types, id) {
  let shadowColor = getPokemonColor(types[0]['type']['name']);
  document.getElementById(`id-${id + 1}`).style.setProperty('--poke-card-shadow', shadowColor);
}


//SECTION:  pokemon info box when clicking on pokemon card
function showPokeInfo(id) {
  generatePokeInfoBox();
}



