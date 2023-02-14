async function fetchUrl(urlAddon){
    let url = `https://pokeapi.co/api/v2/pokemon/${urlAddon}`
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson
}

async function getPokemons() {
    let limit = `?limit=10`
    let pokemonList = await fetchUrl(limit);

    showPokeNames(pokemonList);
}

function showPokeNames(list) {
    
    let pokemon = list['results'];
    for (let i = 0; i < pokemon.length; i++) {
        const name = pokemon[i]['name'];
        let sprite = 0; //
        generatePokemonCard(name, sprite);
    }
}

function generatePokemonCard(name) {
    let main = document.getElementById('main');
    main.innerHTML += `
        <div>
            <p>${name}</p>
        </div>
    `;
}

function getPokemonSprite(i){
    let spritePath = ['sprites']['other']['official-artwork']['front_default'];
    // let sprite = fetchUrl(i)[spritePath]; 
    return sprite
}


