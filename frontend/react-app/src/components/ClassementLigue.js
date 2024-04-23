import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClassementLigue = () => {
    const { idLigue } = useParams();
    const [ligue, setLigue] = useState(null);
    const [gestionnaire, setGestionnaire] = useState()
    const [equipes, setEquipes] = useState([]);
    const [filtre, setFiltre] = useState({ colonne: null, ordre: 'asc' });
    const [matchs , setMatchs] = useState([]);
    

    useEffect(() => {
        const fetchDonnees = async () => {
            try {
                let reponseLigue = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${idLigue}`);
                let dataLigue = await reponseLigue.json();
                setLigue(dataLigue);

                let reponseGestionnaire = await fetch(`https://tch-099-proj.vercel.app/api/api/gestionnaire/${idLigue}`);
                let dataGestionnaire = await reponseGestionnaire.json();
                setGestionnaire(dataGestionnaire);

                let reponseEquipes = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${idLigue}/equipes`);
                let dataEquipes = await reponseEquipes.json();
                setEquipes(dataEquipes);

                let reponseMatchs = await fetch(`https://tch-099-proj.vercel.app/api/api/game/ligue/${idLigue}`);
                let dataMatchs = await reponseMatchs.json();
                setMatchs(dataMatchs);
                
                dataEquipes = dataEquipes.map(equipe => ({
                    ...equipe,
                    differentiel: equipe.nbButsPour - equipe.nbButsContre,
                    pourcentagePoints: equipe.nbMatch > 0 ? ((equipe.nbPoints / (equipe.nbMatch * 3))).toFixed(3) : "0.00"
                }));

                dataEquipes.sort((a, b) => b.nbPoints - a.nbPoints); // Tri initial par points
                dataEquipes.forEach((equipe, index) => equipe.rang = index + 1); // Calcul du rang
                setEquipes(dataEquipes);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données :", erreur);
            }
        };

        fetchDonnees();
    }, [idLigue]);

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

    const getTeamNameById = (teamId) => {
        const team = equipes.find((equipe) => equipe.idEquipe === teamId);
        return team ? team.nom : 'Unknown';
      };

    return ( 
        <div className="conteneur">
            <div className="entete-avec-button">
                <h2>{ligue ? ligue.nomLigue : 'Chargement de la ligue...'}</h2>
                <button>
                    <Link to={`/creerEquipe/${idLigue}`}>Ajouter une équipe</Link>
                </button>
            </div>
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
                        <tr key={equipe.idEquipe}>
                            <td>{equipe.rang}</td>
                            <td>
                            <Link to={`/equipe/${equipe.idEquipe}`}>
                                    {equipe.nom}
                                </Link>
                            </td>
                            <td>{equipe.nbMatch}</td>
                            <td>{equipe.nbVictoires}</td>
                            <td>{equipe.nbDefaites}</td>
                            <td>{equipe.nbNuls}</td>
                            <td>{equipe.nbPoints}</td>
                            <td>{equipe.pourcentagePoints}</td>
                            <td>{equipe.nbButsPour}</td>
                            <td>{equipe.nbButsContre}</td>
                            <td>{equipe.differentiel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="entete-avec-button">
                <h2>Parties</h2>
                <button>
                    <Link to={`/creerPartie/${idLigue}`}>Ajouter une partie</Link>
                </button>
            </div>
            {matchs ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date du match</th>
                            <th>Lieu</th>
                            <th>Equipe domicile</th>
                            <th>Equipe visiteur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchs.length > 0 && matchs.map(match => (
                            <tr key={match.idGame}>
                                <td>{match.dateGame}</td>
                                <td>{match.lieu}</td>
                                <td>{getTeamNameById(match.idEquipeDom)}</td>
                                 <td>{getTeamNameById(match.idEquipeExt)}</td>
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
                    <p>Numero de telephone : {gestionnaire.numTel}</p>
                    <p>Courriel : {gestionnaire.courriel}</p>
                </div>
            ) : (
                <p>Chargement des informations de contact...</p>
            )}
        </div>
     );
}
 
export default ClassementLigue;