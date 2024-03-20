let teamArray = new Array();

teamArray[0] = 3;//test
teamArray[1] = 3;//test

for (let i = 0; i < teamArray.length && teamArray[i] !== undefined; i++) 
{
    let team = teamArray[i];
    let newRow = document.createElement("tr");
    newRow.id = `${team}`;
    newRow.innerHTML = `<tr>${team}</tr>`;
    document.getElementById("teams").appendChild(newRow);
}

let numMatch, numWin, numLoss, points, numDraw, numRecu, numGoal;

//code d'interaction avec database


let teamstable=document.getElementById("teams");
teamstable.addEventListener("click", function(event)
{
    if (event.target.tagName ==="TR") 
    {
        let teamId= event.target.id.team;    

        let teamStat = getTeamstats(teamId);

        updateStatRow(teamStat);
    }
})

function getTeamstats(teamId) 
{
    //interaction avec database

}

function updateStatRow(teamStat)
{
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

}

