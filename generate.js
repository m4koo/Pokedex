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
    

    let cardTop = document.getElementById('poke-info-top');
    cardTop.innerHTML=`
        <button id='close-card' onclick='closeCard()'>X</button>
        <div class='poke-name-id' id='current-poke-name-id'>
            <p>${name}</p>
            <span>#${id.padStart(3, '0')}</span>
        </div>
        <div class='current-poke-type-sprite' id='current-poke-info-type-sprite'>
            <div class='poke-type' id='current-poke-types'></div>
            <img src='${sprite}'>
        </div>   
    `

    let type1 = types[0].cloneNode(true);
    let currentTypes = document.getElementById('current-poke-types');
    currentTypes.appendChild(type1);
    if (types[1]) {
        let type2 = types[1].cloneNode(true);
        currentTypes.appendChild(type2);
        console.log(type2)
    }
    
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
