import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const FaceAFace = () => {

    const { idGame } = useParams();
    const [match, setMatch] = useState(null);
    const [joueursDom, setJoueursDom] = useState([]);
    const [joueursVis, setJoueursVis] = useState([]);

    
    useEffect(() => {
        const fetchDonnees = async () => {
            try {
                let reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/game/${idGame}`);
                const dataMatch = await reponse.json();
                setMatch(dataMatch);

                reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${dataMatch.idEquipeDom}/joueurs`);
                const dataDom = await reponse.json();
                setJoueursDom(dataDom);

                reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${dataMatch.idEquipeDom}/joueurs`);
                const dataVis = await reponse.json();
                setJoueursVis(dataVis);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données :", erreur);
            }
        };

        fetchDonnees();
    }, [idGame]);



    return ( 
    <div className="conteneur">
        <h2>Face à face</h2>
            {match && (
                <table>
                    <thead>
                        <tr>
                            <th>Date du match</th>
                            <th>Lieu</th>
                            <th>Équipe domicile</th>
                            <th>Équipe visiteur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{match.date}</td>
                            <td>{match.lieu}</td>
                            <td>{match.equipeDom}</td>
                            <td>{match.equipeVis}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <h3>Équipe domicile</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Buts</th>
                        <th>Passes</th>
                        <th>Cartons Jaune</th>
                        <th>Cartons Rouge</th>
                    </tr>
                </thead>
                <tbody>
                    {joueursDom.map(joueur => (
                        <tr key={joueur.idJoueur}>
                            <td>{joueur.prenom} {joueur.nom}</td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Équipe visiteur</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Buts</th>
                        <th>Passes</th>
                        <th>Cartons Jaune</th>
                        <th>Cartons Rouge</th>
                    </tr>
                </thead>
                <tbody>
                    {joueursVis.map(joueur => (
                        <tr key={joueur.idJoueur}>
                            <td>{joueur.prenom} {joueur.nom}</td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                            <td><input type="number" defaultValue='0' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button>Enregistrer le résultat de la partie</button>
    </div> 
    );
}
 
export default FaceAFace;