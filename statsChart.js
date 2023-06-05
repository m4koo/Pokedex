async function generateStatsChart(name) {
    let pokemon = await getPokemon(name);
    let stats = pokemon.stats;
    let highestStat = getHighestStat(stats); //min 100
    let statsContainer = document.getElementById('stats-container')
    
    statsChart(stats, highestStat, statsContainer);
}

function statsChart(stats, highestStat, statsContainer) {
    for (let i = 0; i < stats.length; i++) {
        let statNumber = stats[i].base_stat;
        let statName = stats[i].stat.name.replace(/special-/g, "SP. ")
        let formattedStatName = statName.charAt(0).toUpperCase() + statName.substring(1);
        generateStatContainerHTML(statsContainer, formattedStatName, statNumber, i)
        updateProgress(statNumber,highestStat, i)
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

function updateProgress(value,highestStat, i) {
    let stat = Math.round(value/highestStat * 100);
    let statBar = document.getElementById(`stat-bar${i}`);
    statBar.style.width = stat + "%"; //255 highest stat available
    statBarColor(stat, statBar);
}

function statBarColor(value, bar) {
    if (value < 33) {
        bar.style.backgroundColor = 'red'
    }else if (value < 66) {
        bar.style.backgroundColor = 'orange'
    }else{
        bar.style.backgroundColor = 'green'
    }
}

function getHighestStat(stats) {
    let highest = 100;
    for (let i = 0; i < stats.length; i++) {
        if (stats[i].base_stat > highest) {
            highest = stats[i].base_stat;
        }
    }
    return highest;
}

//TODO:
// zusätzlich für stat tab: base hapiness und capture rate