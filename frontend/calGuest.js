

async function fetchDataAndPopulateTable() {
    try {
        
        const response = await fetch("http://127.0.0.1:8000/api/");
        const jsonData = await response.json();
        
        populateTable(jsonData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateTable(data) {
    const tableBody = document.getElementById("calendarBody");
    
    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.id_game}</td>
            <td>${entry.date_game}</td>
            <td>${entry.lieu}</td>
            <td>${entry.id_ligue}</td>
            <td>${entry.time}</td>
        `;
        tableBody.appendChild(row);
    });
}
async function fetchDataAndPopulateTable() {
    try {
        
        const response = await fetch("http://127.0.0.1:8000/api/");
        const jsonData = await response.json();
        
        populateTable(jsonData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateTable(data) {
    const tableBody = document.getElementById("teams");
    
    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.id_equipe}</td>
            <td>${entry.nom}</td>
            <td>${entry.id_ligue}</td>
            <td>${entry.categorie}</td>
        
        `;
        tableBody.appendChild(row);
    });
}

let teamStat;

let teamstable = document.getElementById("teams");
teamstable.addEventListener("click", function (event) {
    if (event.target.tagName === "TR") {
        teamId = event.target.querySelector("td:first-child").textContent;

        teamStat = getTeamstats(teamId);

        updateStatRow(teamStat);
    }
})


    async function fetchDataAndPopulateTable() {
        try {
            
            const response = await fetch("http://127.0.0.1:8000/api/ ${teamId}");
            const jsonData = await response.json();
            
            populateTable2(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
function populateTable(data) {
    const tableBody = document.getElementById("statsBody");
    
    data.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.nb_game}</td>
            <td>${entry.nb_point}</td>
            <td>${entry.nb_victoire}</td>
            <td>${entry.nb_defaite}</td>
            <td>${entry.nb_nul}</td>
            <td>${entry.but_pour}</td>
            <td>${entry.but_contre}</td>
        `;
        tableBody.appendChild(row);
    });
}




