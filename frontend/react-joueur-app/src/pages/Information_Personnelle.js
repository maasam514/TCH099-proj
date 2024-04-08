import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";




export default function Information_Personnelle(){

    const [playerInfo, setPlayerInfo] = useState(null);
    

    // Access location state to get the email passed from the login page
    const location = useLocation();
    const loginEmail = location.state.email;
   

    useEffect(() => {
      async function fetchJoueurInfo() {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/joueur/"+{loginEmail});
          const data = await response.json();
          setPlayerInfo(data);
        } catch (error) {
          console.error("Error fetching player information:", error);
        }
      }
  
      fetchJoueurInfo();
    }, []);
  
    return (
      <div className="Background_info">
        <center><h1>Information Personnelle</h1></center>
        
        <p>Hei maisonnette HAHAHHAHAH{loginEmail} !</p>
        <br />
        <div className="container" id="joueurInfoPerso">
          {playerInfo && Object.keys(playerInfo).map(key => {
            const elementsNames = {
              prenom: "Prénom",
              nom: "Nom",
              num_tel: "Numéro de téléphone",
              courriel: "Courriel",
              date_de_naissance: "Date de naissance"
            };
            const excludedFields = ["id_joueur", "capitaine", "numero", "nbButs", "nbPasses", "nbCatronJaune", "nbCartonRouge"];
            if (!excludedFields.includes(key)) {
              const elementsName = elementsNames[key] || key;
              return (
                <div key={key} className="bubble2">
                  <strong>{elementsName}:</strong> {playerInfo[key]}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  
}