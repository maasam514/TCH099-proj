

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
    const tableBody = document.getElementById("tableBody");
    
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

fetchDataAndPopulateTable();




//envoyer l'info de la formulaire a la bd
document.getElementById("eventForm").addEventListener("submit",async function (event) {
    event.preventDefault();

    let eventDate = document.getElementById("eventDate").value;
    let eventDescription = document.getElementById("eventDescription").value;
    let eventTime = document.getElementById("eventTime").value;
    let eventLocation = document.getElementById("eventLocation").value;
    let eventLigue = document.getElementById("eventLigue").value;
    let eventID = 24;

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${eventID}</td>
        <td>${eventDate}</td>
        <td>${eventDescription}</td>
        <td>${eventTime}</td>
        <td>${eventLocation}</td>
        <td>${eventLigue}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    document.getElementById("calendarBody").appendChild(newRow);

    // efface le contenu de la formulaire
    document.getElementById("eventForm").reset();


    const response = await fetch("http://127.0.0.1:8000/api/ajouter/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept":"application/json",
        },
        body: JSON.stringify({
            "heure":eventTime,
            "date_game":eventDate,
            "lieu":eventLocation,
            "id_ligue":eventLigue,
            "id_game":19,
        }),
    });

    const result = await response.json();
    console.log("Success:", result);

})




// bouton pour effacer l'evenement
document.getElementById("calendarBody").addEventListener("click", async function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        let row = event.target.closest("tr");
        row.remove();
       
        deleteElement(this.id);
    }
});

async function deleteElement(id) {
try {
    const response = await fetch(`http://127.0.0.1:8000/api/delete/game/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        console.log(`Element with ID ${id} deleted successfully.`);

    } else {
        console.error(`Failed to delete element with ID ${id}.`);
        
    }
} catch (error) {
    console.error("Error deleting element:", error);
    
}
}















