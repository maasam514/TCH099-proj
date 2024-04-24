import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const Ligues = () => {
    const [ligues, setLigues] = useState([]);

    useEffect(() => {
        const fetchLigues = async () => {
            try {
                const response = await fetch('https://tch-099-proj.vercel.app/api/api/ligues');
                const data = await response.json();
                setLigues(data);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des ligues :", erreur);
            }
        };

        fetchLigues();
    }, []); 

    return (
        <div className="conteneur">
                <div className='entete-avec-button'>
                    <h2>Ligues</h2>
                    <button>
                        <Link to={'/creerLigue'}>Créer une ligue</Link>
                    </button>
                </div>
                
                {ligues.length > 0 ? (
                    <table>
                        <thead>
                            <tr key={ligues.idLigue}>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Année</th>
                                <th>Nombre d'équipes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ligues && ligues.map((ligue) => (
                                <tr key={ligues.idLigue}>
                                    <td><Link to={`/ligue/${ligue.idLigue}`}>
                                            {ligue.nomLigue}
                                        </Link></td>
                                    <td>{ligue.categorie}</td>
                                    <td>{ligue.annee}</td>
                                    <td>{ligue.nbEquipes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Chargement des ligues...</p>
                )}
        </div>
    );

    
}
 
export default Ligues;