//GENERAL USAGE
async function fetchPokeUrl(urlPath){
    let url = `https://pokeapi.co/api/v2/${urlPath}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson;
}

async function getPokemons() {
    let limit = `?limit=151` //limit 151 for gen 1
    let pokemonList = await fetchPokeUrl('pokemon' +  '/' + limit);
    return pokemonList;
}

async function getPokemon(name) {
  let pokemon = await fetchPokeUrl('pokemon/' + name)
  return pokemon;
}

async function getPokemonSprite(i, spriteType){ //spriteType = default or shiny
    let sprite = await fetchPokeUrl('pokemon/' + `${i + 1}`);
    return sprite['sprites']['other']['official-artwork'][`front_${spriteType}`];
}

async function getPokemonTypes(i) { //returns types array
  let types = await fetchPokeUrl('pokemon/' + `${i + 1}`);
  return types['types'];
}

async function getPokemonSpecies(name) {
  let species = await fetchPokeUrl('pokemon-species/' + name);
  return species;
}

async function getAbilities(pokemon) {
  let abilitiesArray = await pokemon.abilities;
  let abilityNames ='';
  for (let i = 0; i < abilitiesArray.length; i++) {
    abilityNames += abilitiesArray[i].ability.name + ', '; 
  }
  return abilityNames.slice(0, -2);
}

//SECTION: pokemon cards on main page
let currentPageIndex = 1;
let isLoading = false;

async function showPokeCard() {
  let list = await getPokemons();
  let pokemon = list['results'];

  // Berechne den Start- und Endindex basierend auf der aktuellen Seite
  const startIndex = (currentPageIndex - 1) * 20;
  const endIndex = currentPageIndex * 20;

  for (let i = startIndex; i < endIndex && i < pokemon.length; i++) {
    const name = pokemon[i]['name'];
    let sprite = await getPokemonSprite(i, 'default');
    let types = await getPokemonTypes(i);
    generatePokemonCard(i, name, sprite, types);
  }
}

function lazyLoad() {
  // Überprüfe, ob das Ende der Seite erreicht wurde
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
    isLoading = true; // block loading to prevent the next set to start loading -> pokemon list will mix up
    currentPageIndex++;
    showPokeCard().then(() => {
      isLoading = false; // Setze den Ladezustand auf "false", um das Nachladen zu ermöglichen
    });
  }
}
window.addEventListener('scroll', lazyLoad);


function pokeCardStyling(types, i) { //specific styling for the different types
  setPokeCardBackground(types, i);
  setBoxShadow(types, i);
}

function setPokeCardBackground(types, i){
  document.getElementById(`id-${i + 1}`).style.backgroundImage = `url('img/svg/types/${types[0]['type']['name']}.svg')`;
}

function setBoxShadow(types, i) {
  let shadowColor = getPokemonColor(types[0]['type']['name']);
  document.getElementById(`id-${i + 1}`).style.setProperty('--poke-card-shadow', shadowColor);
}


//SECTION:  pokemon info box when clicking on pokemon card
function showPokeInfo(i) {
  togglePokeInfoBox();
  generatePokeInfoCard(i)
}

function togglePokeInfoBox() {
  document.getElementById('poke-info-background').classList.remove('hidden');
  document.getElementById('poke-info-card').classList.remove('hidden');
  document.body.style.overflow = 'hidden'
}

function closeCard() {
  document.getElementById('poke-info-background').classList.add('hidden');
  document.getElementById('poke-info-card').classList.add('hidden');
  document.getElementById('poke-info-top').innerHTML = '';
  document.body.style.overflow = 'auto'
}

