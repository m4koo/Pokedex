async function fetchPokeUrl(urlPath){
    let url = `https://pokeapi.co/api/v2/pokemon/${urlPath}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson;
}

async function getPokemons() {
    let limit = `?limit=151` //limit 151 für alle gen 1
    let pokemonList = await fetchPokeUrl(limit);
    
    showPokeCard(pokemonList);
}

async function getPokemonSprite(i){
    let sprite = await fetchPokeUrl(i + 1); 
    // console.log(sprite['sprites']['other']['official-artwork']['front_default'])
    return sprite['sprites']['other']['official-artwork']['front_default'];
}

async function getPokemonTypes(i) {
    let types = await fetchPokeUrl(i+1);
    return types['types'];
}

async function showPokeCard(list) {
    let pokemon = list['results'];
    for (let i = 0; i < pokemon.length; i++) {
        const name = pokemon[i]['name'];
        let sprite = await getPokemonSprite(i); //
        let types = await getPokemonTypes(i);
        generatePokemonCard(i, name, sprite, types);
    }
}

function generatePokemonCard(id, name, sprite, types) {
    let main = document.getElementById('main');
    let str = `${id + 1}`;
    main.innerHTML += `
        <div id='id-${id + 1}' class='poke-card'>
            <div class='poke-name-id'>
                <p>${name}</p>
                <span>#${str.padStart(3, '0')}</span>
            </div>
            <div class='poke-type-sprite'>
                <div id='poke-type-${id}'>
                    ${generatePokeTypes(types, id)}
                </div>
                <img src='${sprite}'>
            </div>
        </div>
    `;
    document.getElementById(`id-${id + 1}`).style.backgroundColor = getPokemonColor(types[0]['type']['name'])
}

function generatePokeTypes(types, i){
    let typesHtml = '';
    console.log(types)
    for (let j = 0; j < types.length; j++) {
        typesHtml += `<p>${types[j]['type']['name']}</p>`
    }
    return typesHtml
}

function getPokemonColor(type) {
    let color;
  
    switch (type) {
      case "normal":
        color = "#A8A878";
        break;
      case "fire":
        color = "#F08030";
        break;
      case "water":
        color = "#6890F0";
        break;
      case "grass":
        color = "#78C850";
        break;
      case "electric":
        color = "#F8D030";
        break;
      case "ice":
        color = "#98D8D8";
        break;
      case "fighting":
        color = "#C03028";
        break;
      case "poison":
        color = "#A040A0";
        break;
      case "ground":
        color = "#E0C068";
        break;
      case "flying":
        color = "#A890F0";
        break;
      case "psychic":
        color = "#F85888";
        break;
      case "bug":
        color = "#A8B820";
        break;
      case "rock":
        color = "#B8A038";
        break;
      case "ghost":
        color = "#705898";
        break;
      case "dragon":
        color = "#7038F8";
        break;
      case "dark":
        color = "#705848";
        break;
      case "steel":
        color = "#B8B8D0";
        break;
      case "fairy":
        color = "#EE99AC";
        break;
      default:
        color = "#68A090"; // default color for unknown types
        break;
    }
  
    return color;
  }
  

