import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Equipe = () => {
    const { id_equipe } = useParams();
    const [infoEquipe, setInfoEquipe] = useState(null);
    const [statEquipe, setStatEquipe] = useState(null);
    const [ligue, setLigue] = useState(null);
    const [joueurs, setJoueurs] = useState(null);
    const [matchs , setMatchs] = useState([]);

    useEffect(() => {
        const fetchDonnees = async () => {
            // Fetch les informations de l'équipe
            let reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${id_equipe}`);
            let dataInfoEquipe = await reponse.json();
            setInfoEquipe(dataInfoEquipe);

            // Fetch des statistiques de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/equipe/${id_equipe}`);
            let dataStatsEquipe = await reponse.json();
            setStatEquipe(dataStatsEquipe);

            // Fetch les infos de la ligue de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${dataInfoEquipe.id_ligue}`);
            let dataLigue = await reponse.json();
            setLigue(dataLigue);

            // Fetch les joueurs et leurs statistiques de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${id_equipe}/joueurs`);
            let dataJoueurs = await reponse.json();
            setJoueurs(dataJoueurs);

            // Fetch les match de l'équipe
            reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/game/equipe/${id_equipe}`);
            let dataMatchs = await reponse.json();
            setMatchs(dataMatchs.parties);
        };

        fetchDonnees();
    }, [id_equipe]);

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
                                    <Link to={`/ligue/${infoEquipe.id_ligue}`}>
                                        {ligue.nomLigue}
                                    </Link>
                                ) : 'Chargement de la ligue...'}
                            </td>
                            <td>{infoEquipe.nb_joueurs}</td>
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
            <h2>Joueurs</h2>
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
                    {joueurs && joueurs.map(joueur => (
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
            <h2>Matchs</h2>
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
        </div>
    );
}
 
export default Equipe;