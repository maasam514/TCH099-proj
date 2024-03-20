document.getElementById("eventForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let eventDate = document.getElementById("eventDate").value;
    let eventDescription = document.getElementById("eventDescription").value;
    let eventTime = document.getElementById("eventTime").value;
    let eventLocation = document.getElementById("eventLocation").value;
    let eventLigue = document.getElementById("eventLigue").value;

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
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
});

// bouton pour effacer l'evenement
document.getElementById("calendarBody").addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        let row = event.target.closest("tr");
        row.remove();
    }
});
