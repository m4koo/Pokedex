async function generateStatsChart(name) {
    let pokemon = await getPokemon(name);
    let stats = pokemon.stats;
    let statsContainer = document.getElementById('stats-container')
    console.log(stats);
    
    for (let i = 0; i < stats.length; i++) {
        let statNumber = stats[i].base_stat;
        let statName = stats[i].stat.name.replace(/special-/g, "SP. ")
        let formattedStatName = statName.charAt(0).toUpperCase() + statName.substring(1);
        generateStatContainerHTML(statsContainer, formattedStatName, statNumber, i)
        updateProgress(statNumber, i)
    }
}

function generateStatContainerHTML(div, name, number, i) {
    div.innerHTML+=`
        <div class="chart-row">
            <span class = "row-label">${name}</span>
            <p class="stat-number">${number}</p>
            <div class='stat-bar-container'>
                <div id='stat-bar${i}' class='stat-bar'
            </div>
        </div>
    `;
}


function statBarColor(value, bar) {
    if (value < 10) {
        bar.style.backgroundColor = 'red'
    }else if (value < 20) {
        bar.style.backgroundColor = 'orange'
    }else{
        bar.style.backgroundColor = 'green'
    }
}


function updateProgress(value, i) {
    let stat = Math.round(value/255 * 100);
    console.log(stat);
    let statBar = document.getElementById(`stat-bar${i}`);
    statBar.style.width = stat + "%"; //255 highest stat available
    statBarColor(stat, statBar);
}

//TODO: statbar sollte eine max länge für 100er stat haben, außer 100er stat wird überschritten, dann wird die länge vom höchsten stat bestimmt
// -> schleife durch die stats und checken if stat > 100. dann statValue/highestStat * 100
// statcolor indicator anpassen
// zusätzlich für stat tab: base hapiness und capture rate