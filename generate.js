function generatePokemonCard(id, name, sprite, types) {
    let main = document.getElementById('main');
    let str = `${id + 1}`;
    main.innerHTML += `
        <div id='id-${id + 1}' class='poke-card' onclick='showPokeInfo(${id})'>
            <div class='poke-name-id'>
                <p>${name}</p>
                <span>#${str.padStart(3, '0')}</span>
            </div>
            <div class='poke-type-sprite'>
                <div class='poke-type'>
                    ${generatePokeTypes(types, id)}
                </div>
                <img src='${sprite}'>
            </div> 
        </div>
    `;
    pokeCardStyling(types, id);
}

function generatePokeTypes(types, i){
    let typesHtml = '';
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        typesHtml += `<p style='background-color: ${getPokemonColor(type)}'>${type}</p>`
    }
    return typesHtml
}

function generatePokeInfoBox() {
    let background = document.getElementById('poke-info-background');
    let card = document.getElementById('poke-info-card');
    background.classList.remove('hidden');
    card.classList.remove('hidden');

    background.onclick = () => {
        background.classList.add('hidden');
        card.classList.add('hidden');
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
