import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClassementLigue = () => {
    const { id_ligue } = useParams();
    const [ligue, setLigue] = useState(null);
    const [gestionnaire, setGestionnaire] = useState()
    const [equipes, setEquipes] = useState([]);
    const [filtre, setFiltre] = useState({ colonne: null, ordre: 'asc' });
    const [matchs , setMatchs] = useState([]);
    

    useEffect(() => {
        const fetchDonnees = async () => {
            try {
                let reponseLigue = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${id_ligue}`);
                let dataLigue = await reponseLigue.json();
                setLigue(dataLigue);

                let reponseGestionnaire = await fetch(`https://tch-099-proj.vercel.app/api/api/gestionnaire/${id_ligue}`);
                let dataGestionnaire = await reponseGestionnaire.json();
                setGestionnaire(dataGestionnaire);

                let reponseEquipes = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${id_ligue}/equipes`);
                let dataEquipes = await reponseEquipes.json();
                setEquipes(dataEquipes);

                let reponseMatchs = await fetch(`https://tch-099-proj.vercel.app/api/api/game/equipe/${id_ligue}`);
                let dataMatchs = await reponseMatchs.json();
                setMatchs(dataMatchs.parties);
                
                dataEquipes = dataEquipes.map(equipe => ({
                    ...equipe,
                    differentiel: equipe.but_pour - equipe.but_contre,
                    pourcentage_points: equipe.nb_game > 0 ? ((equipe.nb_point / (equipe.nb_game * 3))).toFixed(3) : "0.00"
                }));

                dataEquipes.sort((a, b) => b.nb_point - a.nb_point); // Tri initial par points
                dataEquipes.forEach((equipe, index) => equipe.rang = index + 1); // Calcul du rang
                setEquipes(dataEquipes);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données :", erreur);
            }
        };

        fetchDonnees();
    }, [id_ligue]);

    const handleFiltrer = (colonne) => {
        const estAscendant = filtre.colonne === colonne && filtre.ordre === 'asc';
        const nouvelOrdre = estAscendant ? 'desc' : 'asc';
    
        const equipesTriees = [...equipes].sort((a, b) => {
            if (a[colonne] < b[colonne]) {
                return nouvelOrdre === 'asc' ? -1 : 1;
            }
            if (a[colonne] > b[colonne]) {
                return nouvelOrdre === 'asc' ? 1 : -1;
            }
            return 0;
        });
    
        setEquipes(equipesTriees);
        setFiltre({ colonne, ordre: nouvelOrdre });
    };

    return ( 
        <div className="conteneur">
            <h2>{ligue ? ligue.nomLigue : 'Chargement de la ligue...'}</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleFiltrer('rang')}>Rang</th>
                        <th onClick={() => handleFiltrer('equipe')}>Équipe</th>
                        <th onClick={() => handleFiltrer('nb_game')}>MJ</th>
                        <th onClick={() => handleFiltrer('nb_victoire')}>V</th>
                        <th onClick={() => handleFiltrer('nb_defaite')}>D</th>
                        <th onClick={() => handleFiltrer('nb_nul')}>N</th>
                        <th onClick={() => handleFiltrer('nb_point')}>Pts</th>
                        <th onClick={() => handleFiltrer('pourcentage_points')}>%Pts</th>
                        <th onClick={() => handleFiltrer('but_pour')}>BP</th>
                        <th onClick={() => handleFiltrer('but_contre')}>BC</th>
                        <th onClick={() => handleFiltrer('differentiel')}>Différentiel</th>
                    </tr>
                </thead>
                <tbody>
                    {equipes.map((equipe) => (
                        <tr key={equipe.id_equipe}>
                            <td>{equipe.rang}</td>
                            <td>
                            <Link to={`/equipe/${equipe.id_equipe}`}>
                                    {equipe.nom}
                                </Link>
                            </td>
                            <td>{equipe.nb_game}</td>
                            <td>{equipe.nb_victoire}</td>
                            <td>{equipe.nb_defaite}</td>
                            <td>{equipe.nb_nul}</td>
                            <td>{equipe.nb_point}</td>
                            <td>{equipe.pourcentage_points}</td>
                            <td>{equipe.but_pour}</td>
                            <td>{equipe.but_contre}</td>
                            <td>{equipe.differentiel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Matchs</h2>
            {matchs ? (
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
            ) : (
                <p>Chargement des matchs...</p>
            )}
            {gestionnaire ? (
                <div>
                    <h2>Contacter la ligue</h2>
                    <p>Gestionnaire : {gestionnaire.prenom} {gestionnaire.nom}</p>
                    <p>Numero de telephone : {gestionnaire.num_tel}</p>
                    <p>Courriel : {gestionnaire.courriel}</p>
                </div>
            ) : (
                <p>Chargement des informations de contact...</p>
            )}
        </div>
     );
}
 
export default ClassementLigue;