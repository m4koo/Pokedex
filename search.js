function filterPokemon() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); // Hole den Inhalt des Suchfeldes und konvertiere ihn in Kleinbuchstaben
  
    const pokeCards = document.getElementsByClassName('poke-card'); // Hole alle Pokémon-Karten
  
    Array.from(pokeCards).forEach((card) => { // Iteriere über alle Pokémon-Karten
      const cardName = card.getElementsByClassName('poke-name-id')[0].getElementsByTagName('p')[0].innerText.toLowerCase(); // Hole den Namen des Pokémon auf der Karte und konvertiere ihn in Kleinbuchstaben
  
      if (cardName.includes(searchInput)) { // Überprüfe, ob der Name des Pokémon den Suchbegriff enthält
        card.style.display = 'flex'; // Zeige die Karte an
      } else {
        card.style.display = 'none'; // Verstecke die Karte
      }
    });
}

function searchLoad() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterPokemon);
}

