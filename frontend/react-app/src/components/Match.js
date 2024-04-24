import { useEffect, useState } from 'react';
import '../styles/parties.css';

export default function Match() {
  const [futurMatchs, setFuturMatchs] = useState([]);
  const [ancienMatchs, setAncienMatchs] = useState([]);
  const [messageErrorFutur, setMessageErrorFutur] = useState('');
  const [messageErrorPrevious, setMessageErrorPrevious] = useState('');
  const [opponents, setOpponents] = useState({});
  const [categoryId, setCategoryId] = useState(1); 
  
  const id_joueur = localStorage.getItem('id');
 

  //Pour chercher les informations des matchs
  useEffect(() => {
    async function fetchData() {
      try {
        let endpoint = '';

        //Chercher les informations des match pour le joueur specifiquement comme Date, Heure, Lieu, Adversaire
        if (categoryId === 1) {
          let reponse1 = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${id_joueur}`);
          let dataJoueur = await reponse1.json();
          
          endpoint = `https://tch-099-proj.vercel.app/api/api/game/equipe/${dataJoueur.idEquipe}?categorie=${categoryId}`;
        } 
        //Chercher les informations des resultats des matchs comme Resultats, nbPasse, nbCartons, Adversaire
        else {
          let reponse2 = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${id_joueur}`);
          let dataJoueur2 = await reponse2.json();

          endpoint = `https://tch-099-proj.vercel.app/api/api/resultats/equipe/${dataJoueur2.idEquipe}`;
        }
        //Apres avoir choisi quel section on va chercher l'information demander
        const response = await fetch(endpoint);
        const data = await response.json();

        //Si c'est categorie 1 on affiche les information des matchs futurs si non des matchs precedents
        if (categoryId === 1) {
          setFuturMatchs(data.parties);
          setAncienMatchs([]);
          setMessageErrorFutur('');
          setMessageErrorPrevious('');
        } else {
          setAncienMatchs(data);
          setFuturMatchs([]);
          setMessageErrorFutur('');
          setMessageErrorPrevious('');
        }
      } //Gestions d'erreur
      catch (error) {
        console.error("Error fetching data:", error);
        if (categoryId === 1) {
          setMessageErrorFutur("Aucune information trouvée");
          setFuturMatchs([]); 
          setAncienMatchs([]); 
          setMessageErrorPrevious(''); 
        } else {
          setMessageErrorPrevious("Aucune information trouvée");
          setAncienMatchs([]); 
          setFuturMatchs([]); 
          setMessageErrorFutur(''); 
        }
      }
    }
    //Fonction qui vient chercher l'information qu'on veut du tableau Game dans la base de donnee pour ensuite l'utiliser dans la section ancien matchs 
    async function fetchOpponentData() {
      try {
        let reponse2 = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${id_joueur}`);
        let dataJoueur2 = await reponse2.json();
        const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/equipe/${dataJoueur2.idEquipe}`);
        const data = await response.json();
        const opponentsData = {};
        data.parties.forEach(match => {
          opponentsData[match.idGame] = match.equipeContre;
        });
        setOpponents(opponentsData);
      } catch (error) {
        console.error("Error fetching opponent data:", error);
        setOpponents({});
      }
    }
  
    fetchData();
    fetchOpponentData();
  }, [ categoryId]);

  return (

    <div className="conteneur">
    <div>

      <h2>Est-ce que vous voulez vos...</h2>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ marginRight: '10px' }} onClick={() => setCategoryId(1)}>Match avenir</button>
        <button onClick={() => setCategoryId(2)}>Match précédents</button>
      </div>
      {categoryId === 1 ? (
        <div>
          <center><h2>Matchs À venir</h2></center>
        <table>
          <thead>
            <tr>
              <th>Date: Heure</th>
              <th>Lieu</th>
              <th>Adversaire</th>
            </tr>
          </thead>
          <tbody>
            {messageErrorFutur && <tr><td colSpan="3" style={{ color: 'red' }}>{messageErrorFutur}</td></tr>}
            {futurMatchs.map((match, index) => (
              <tr key={index}>
                <td>{match.dateGame}</td>
                <td>{match.lieu}</td>
                <td>{match.equipeContre}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <div>
        <center><h2>Matchs Précédents</h2></center>
        <table>
        
          <thead>
            <tr>
              <th>Match</th>
              <th>Résultats</th>
              <th>Passes</th>
              <th>Carton Jaune</th>
              <th>Carton Rouge</th>
              <th>Adversaire</th>
            </tr>
          </thead>
          <tbody>
            {messageErrorPrevious && <tr><td colSpan="6" style={{ color: 'red' }}>{messageErrorPrevious}</td></tr>}
            {ancienMatchs.map((resultat, index) => (
              <tr key={index}>
                <td>{resultat.idGame}</td>
                <td>{resultat.scoreEquipeDom} - {resultat.scoreEquipeExterieur}</td>
                <td>{resultat.passes}</td>
                <td>{resultat.carteJaune}</td>
                <td>{resultat.carteRouge}</td>
                <td>{opponents[resultat.idGame]}</td> 
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
    </div>
  );
}
