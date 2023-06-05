function generatePokemonCard(i, name, sprite, types) {
    let main = document.getElementById('main');
    let id = `${i + 1}`;
    main.innerHTML += `
        <div id='id-${id}' class='poke-card' onclick='showPokeInfo(${i})'>
            <div class='poke-name-id'>
                <p>${name}</p>
                <span>#${id.padStart(3, '0')}</span>
            </div>
            <div class='poke-type-sprite'>
                <div class='poke-type'>
                    ${generatePokeTypes(types, i)}
                </div>
                <img src='${sprite}'>
            </div> 
        </div>
    `;
    pokeCardStyling(types, i);
}

function generatePokeTypes(types, i){
    let typesHtml = '';
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        typesHtml += `<p style='background-color: ${getPokemonColor(type)}'>${type}</p>`
    }
    return typesHtml
}

function generatePokeInfoCard(i) {
    let id = `${i + 1}`
    let name = document.querySelector(`#id-${id} > div > p`).innerHTML;
    let sprite = document.querySelector(`#id-${id} > .poke-type-sprite > img`).getAttribute('src');
    let types = document.querySelector(`#id-${id} > .poke-type-sprite > div`).querySelectorAll('p');
    generatePokeInfoCardTop(name, id, sprite, types); 
    generatePokeInfoCardBottom(name);
}

function generatePokeInfoCardBottom(name) {
    let cardBottom = document.getElementById('poke-info-bottom');
    cardBottom.innerHTML =`
        <div id='info-tabs'>
            <span id='info'>Info</span>
            <span id='stats'>Stats</span>
            <span id='moves'>Moves</span>
        </div>
        <div id='selected-tab'></div>
    `;
    addClickListeners(name);
}

function generatePokeInfoCardTop(name, id, sprite, types){
    let cardTop = document.getElementById('poke-info-top');
    cardTop.innerHTML=`
        <div class='poke-name-id' id='current-poke-name-id'>
            <p>${name}</p>
            <span>#${id.padStart(3, '0')}</span>
            ${generatePokeButton()}
        </div>
        <div class='current-poke-type-sprite' id='current-poke-info-type-sprite'>
            <div class='poke-type' id='current-poke-types'></div>
            <button class='shinyBtn' id='shiny_${id}'><img id="pic1" class ='shinyBtnImg' src='img/svg/shiny_active.png'><img id='pic2' src='img/svg/shiny_inactive.png'></button>
            <img src='${sprite}' id='infoImg${id}'>
        </div>   
        `

    toggleSprite(id);
    generatePokeCardInfoTopTypes(types, cardTop);
}

function toggleSprite(id) {
  let shiny = document.querySelector(`#shiny_${id}`);
    shiny.addEventListener("click", async () => {
      let inactive = document.querySelector(`#pic2`);

      if (inactive.classList.contains('hidden')) {
        inactive.classList.remove('hidden'); //activate shiny
        spriteType = 'default'
      }else{
        inactive.classList.add('hidden');
        spriteType = 'shiny'
      }

      let sprite = await getPokemonSprite(parseInt(id) - 1, spriteType);
      document.querySelector(`#infoImg${id}`).src=`${sprite}`;
    });
}

function generatePokeCardInfoTopTypes(types, cardTop) {
    let type1 = types[0].cloneNode(true);
    let currentTypes = document.getElementById('current-poke-types');
    currentTypes.appendChild(type1);
    if (types[1]) {
        let type2 = types[1].cloneNode(true);
        currentTypes.appendChild(type2);
    }
    cardTop.style.backgroundColor = getPokemonColor(type1.innerHTML);
}

function addClickListeners(name) {
  const tab = document.getElementById('selected-tab')
  const infoSpan = document.getElementById('info');
  const statsSpan = document.getElementById('stats');
  const movesSpan = document.getElementById('moves');

  infoSpan.addEventListener('click', async () => {
    await infoTab(tab, name);
  });

  statsSpan.addEventListener('click', async () => {
    await statsTab(tab, name);
  });

  movesSpan.addEventListener('click', async () => {
    await movesTab(tab);
  });

  infoTab(tab, name);
}

async function infoTab(tab, name) { //Note: async funcs do not work with onclick in HTML element
  let species = await getPokemonSpecies(name);
  let pokemon = await getPokemon(name);
  let pokedexEntry = pokedexEntryEnglish(species);
  tab.innerHTML=`
    <div id='pokedex-entry'>${pokedexEntry.replace(/\u000c/g, ' ')}</div>
    <div id='height'>Height: ${pokemon.height}</div>
    <div id='weight'>Weight: ${pokemon.weight}</div>
    <div id='abilities'>Abilities: <span>${await getAbilities(pokemon)}</span></div>
  `;
}

function pokedexEntryEnglish(species) {
  let dex = species.flavor_text_entries;
  for (let i = 0; i < dex.length; i++) {
    if (dex[i].language.name == 'en') {
      return dex[i].flavor_text;
    }
  }
}

async function statsTab(tab, name) {
  tab.innerHTML=`
  <div id="stats-container"> </div>
  `;
  await generateStatsChart(name);
}

function movesTab(tab) {
  tab.innerHTML=`
  
  `
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

function generatePokeButton() {
    let button = '';
    button += `
        <button class="pokeball-button" onclick="closeCard()">
            <div class="pokeball-top"></div>
            <div class="pokeball-bottom"></div>
            <div class="pokeball-x"></div>
            <div class="pokeball-center-inner">X</div>
        </button>
    `
    return button;
}
