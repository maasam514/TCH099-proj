let teamNameTab = new Array();
let teamLigTab = new Array();
let teamCatTab = new Array();


//code d'interaction avec database
//pour recuperer les equipes

//test
teamNameTab[0] = "voila";
teamNameTab[1] = "koala";
teamLigTab[0] = "ligue 3";
teamLigTab[1] = "ligue 1";
teamCatTab[0] = "ligue 1";
teamCatTab[1] = "ligue 1";

for (let i = 0; i < teamNameTab
    .length && teamNameTab
    [i] !== undefined; i++) {
    let teamName = teamNameTab[i];
    let teamLig = teamLigTab[i];
    let teamCat = teamCatTab[i];
    let newRow = document.createElement("tr");
    newRow.id = `${teamName}`;
    newRow.innerHTML = `
                            <td>${teamName}</td>
                            <td>${teamLig}</td>
                            <td>${teamCat}</td>
                        `;
    document.getElementById("teams").appendChild(newRow);
}

let teamstable = document.getElementById("teams");
teamstable.addEventListener("click", function (event) {
    if (event.target.tagName === "TR") {
        let teamId = event.target.id.team;

        let teamStat = getTeamstats(teamId);

        updateStatRow(teamStat);
    }
})

function getTeamstats(teamId) {
    let numMatch, numWin, numLoss, points, numDraw, numRecu, numGoal;
    //interaction avec database

}

function updateStatRow(teamStat) {
    let statRow = document.getElementById("statsBody");
    statRow.removeChild;
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${numMatch}</td>
        <td>${points}</td>
        <td>${numWin}</td>
        <td>${numLoss}</td>
        <td>${numDraw}</td>
        <td>${numGoal}</td>
        <td>${numRecu}</td>
    `;

    statRow.appendChild(newRow);

}

