import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";




export default function Information_Personnelle(){

    const [playerInfo, setPlayerInfo] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
      // Retrieve user ID from local storage
      const id = localStorage.getItem('id');
      if (id) {
          setUserId(id);
      } else {
          // Handle case when user ID is not found in local storage
          // You might want to redirect the user to the login page or handle it accordingly
          // For example:
          // history.push('/login');
          setUserId('1');
      }
  }, []);

    // Access location state to get the email passed from the login page
    //const location = useLocation();
    //const loginEmail = location.state.email;
    //<p>Hei maisonnette HAHAHHAHAH{loginEmail} !</p>
   

    useEffect(() => {
      async function fetchJoueurInfo() {
        try {
          const response = await fetch("https://tch-099-proj.vercel.app/api/api/joueur/" + userId);
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
        <p> Hiiiiiiiiiiiiiiii   {userId}</p>
        
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