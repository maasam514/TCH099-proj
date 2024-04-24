import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Equipe = () => {
    const { idEquipe } = useParams();
    const [infoEquipe, setInfoEquipe] = useState(null);
    const [statEquipe, setStatEquipe] = useState(null);
    const [ligue, setLigue] = useState(null);
    const [joueurs, setJoueurs] = useState(null);
    const [matchs , setMatchs] = useState([]);
    const [ancienMatchs, setAncienMatchs] = useState([]);
    const [opponents, setOpponents] = useState({});

    useEffect(() => {
        const fetchDonnees = async () => {
            // Fetch les informations de l'équipe
            let reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${idEquipe}`);
            let dataInfoEquipe = await reponse.json();
            setInfoEquipe(dataInfoEquipe);

            // Fetch des statistiques de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/equipe/${idEquipe}`);
            let dataStatsEquipe = await reponse.json();
            setStatEquipe(dataStatsEquipe);

            // Fetch les infos de la ligue de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${dataInfoEquipe.idLigue}`);
            let dataLigue = await reponse.json();
            setLigue(dataLigue);

            // Fetch les joueurs et leurs statistiques de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${idEquipe}/joueurs`);
            let dataJoueurs = await reponse.json();
            setJoueurs(dataJoueurs);

            // Fetch les match de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/game/equipe/${idEquipe}`);
            let dataMatchs = await reponse.json();
            setMatchs(dataMatchs.parties);

            //Fetch les ancien matchs
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/resultats/equipe/${idEquipe}`)
            let dataAncienMatch = await reponse.json();
            setAncienMatchs(dataAncienMatch);
        };


        //Fonction qui vient chercher l'information qu'on veut du tableau Game dans la base de donnee pour ensuite l'utiliser dans la section ancien matchs 
    async function fetchOpponentData() {
        try {
          
          const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/equipe/${idEquipe}`);
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

        fetchDonnees();
        fetchOpponentData();
    }, [idEquipe]);

    return (  
        <div className="conteneur">
            {/* Informations de l'équipe */}
            <h2>{infoEquipe && infoEquipe.nom}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th>Ligue</th>
                        <th>Nombre de joueurs</th>
                    </tr>
                </thead>
                <tbody>
                    {infoEquipe && (
                        <tr>
                            <td>{infoEquipe.nom}</td>
                            <td>{infoEquipe.categorie}</td>
                            <td>
                                {ligue ? (
                                    <Link to={`/ligue/${infoEquipe.idLigue}`}>
                                        {ligue.nomLigue}
                                    </Link>
                                ) : 'Chargement de la ligue...'}
                            </td>
                            <td>{infoEquipe.nbJoueurs}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Statistiques de l'équipe */}
            <h2>Statistiques de l'équipe</h2>
            <table>
                <thead>
                    <tr>
                        <th>Victoires</th>
                        <th>Défaites</th>
                        <th>Nuls</th>
                        <th>Points</th>
                        <th>Buts Pour</th>
                        <th>Buts Contre</th>
                        <th>Matchs</th>
                    </tr>
                </thead>
                <tbody>
                    {statEquipe && (
                        <tr>
                            <td>{statEquipe.nbVictoires}</td>
                            <td>{statEquipe.nbDefaites}</td>
                            <td>{statEquipe.nbNuls}</td>
                            <td>{statEquipe.nbPoints}</td>
                            <td>{statEquipe.nbButsPour}</td>
                            <td>{statEquipe.nbButsContre}</td>
                            <td>{statEquipe.nbMatchs}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Joueurs */}
            <h2>Statistique des Joueurs de l'équipe</h2>
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Buts</th>
                        <th>Passes</th>
                        <th>Carton Jaune</th>
                        <th>Carton Rouge</th>
                    </tr>
                </thead>
                <tbody>
                    {joueurs !== null &&Array.isArray(joueurs)  && joueurs.map(joueur => (
                        <tr key={joueur.idJoueur}>
                            <td>
                            <Link to={`/joueur/${joueur.idJoueur}`}>
                                        {joueur.prenom} {joueur.nom}
                                    </Link></td>
                            <td>{joueur.nbButs}</td>
                            <td>{joueur.nbPasses}</td>
                            <td>{joueur.nbCartonJaune}</td>
                            <td>{joueur.nbCartonRouge}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Matchs */}
            <h2>Matchs À venir</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date du match</th>
                        <th>Lieu</th>
                        <th>Adversaire</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Ici, vous vérifiez d'abord si 'matchs' contient des éléments avant de faire le .map() */}
                    {matchs.length > 0 && matchs.map(match => (
                        <tr key={match.idGame}>
                            <td>{match.dateGame}</td>
                            <td>{match.lieu}</td>
                            <td>{match.equipeContre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Matchs Précédents</h2>
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
            {ancienMatchs && ancienMatchs.map((resultat, index) => (
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
    );
}
 
export default Equipe;