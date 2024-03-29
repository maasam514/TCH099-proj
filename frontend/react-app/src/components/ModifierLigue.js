import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierLigue = () => {
    const { ligueId } = useParams(); // Récupère l'ID de la ligue de l'URL
    const navigate = useNavigate(); // On obtient la fonction navigate
    const [ligue, setLigue] = useState({
        nomLigue: '',
        categorieLigue: '',
        anneeLigue: '',
        nbEquipes: '',
    });
    const [equipes, setEquipes] = useState([]); 
    const [nouvellesEquipes, setNouvellesEquipes] = useState([]);
    const [equipesRetirees, setEquipesRetirees] = useState([]);
    const [idModifEquipe, setIdModifEquipe] = useState('');
    const anneeCourante = new Date().getFullYear();

    //initialise les états de la ligue et de ses equipes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ligueResponse, equipesResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/ligue/${ligueId}`),
                    fetch(`http://127.0.0.1:8000/api/ligue/${ligueId}/equipes`)
                ]);
    
                if (!ligueResponse.ok || !equipesResponse.ok) {
                    throw new Error(`Erreur lors du chargement des données de la ligue : ${ligueResponse.statusText}`);
                }
    
                const ligueData = await ligueResponse.json();
                const equipesData = await equipesResponse.json();
    
                setLigue(ligueData);
                setEquipes(equipesData);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                // Afficher le message d'erreur à l'utilisateur ici, si nécessaire
            }
        };
    
        fetchData();
    }, [ligueId]);
    

    // Rajoute l'équipe au id idModifEquipe a la liste equipes et nouvellesEquipes
    const ajouterEquipe = async () => {
        if (!idModifEquipe) {
            console.error("Veuillez saisir un ID de d'équipe.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/equipe/${idModifEquipe}`);
            if (!response.ok) {
                throw new Error('Échec de la récupération des détails de l’équipe');
            }
            const equipeData = await response.json();

            // Ajoute l'équipe à la liste des équipes de la ligue
            setEquipes(prev => [...prev, equipeData]);

            // Ajoute l'équipe à la liste des nouvelles équipes
            setNouvellesEquipes(prev => [...prev, equipeData]);

            // Réinitialiser l'ID pour ajouter une nouvelle équipe
            setIdModifEquipe(''); 
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'équipe :", error);
        }
    };

    //Retire l'équipe au id idModifEquipe de la liste equipes et la rajoute a equipesRetirees
    const retirerEquipe = async () => {
        if (!idModifEquipe) {
            console.error("Veuillez saisir un ID de d'équipe.");
            return;
        }

            // Trouver l'équipe à retirer dans la liste des équipes
        const equipeARetirer = equipes.find(equipe => equipe.id_equipe.toString() === idModifEquipe);

            // Vérifie si l'équipe à été trouvée  
        if (equipeARetirer) { 
                // Retire l'équipe de la liste de équipes
            setEquipes(prev => prev.filter(equipe => equipe.id_equipe.toString() !== idModifEquipe));
            
                // Ajoute l'équipe retirée à la liste des équipes retirées 
            setEquipesRetirees(prev => [...prev, equipeARetirer]); 
        }else {
            console.error("Équipe non trouvée.");
        }
        
        // Réinitialise l'ID après le retrait de l'équipe
        setIdModifEquipe(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
                // Mettre à jours les infos de la ligue
            const ligueResponse = await fetch(`http://127.0.0.1:8000/api/modifier/ligue/${ligueId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ligue),
            });
    
            if (!ligueResponse.ok) {
                throw new Error('Erreur lors de la modification de la ligue');
            }
                
            // Mettre a jour le 'id_ligue' des équipe rajoutées
            const equipeUpdates = nouvellesEquipes.map(equipe => 
                fetch(`http://127.0.0.1:8000/api/modifier/equipe/${equipe.id_equipe}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...equipe, id_ligue: ligueId }),
                })
            );
                
            // Mettre à jour le 'id_ligue' des équipes retirées
            const equipeRetireesUpdates = equipesRetirees.map(equipe => 
                fetch(`http://127.0.0.1:8000/api/modifier/equipe/${equipe.id_equipe}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...equipe, id_ligue: null }),
                })
            );
    
            // Attendre que toutes les mises à jour d'équipes soient terminées
            await Promise.all([...equipeUpdates, ...equipeRetireesUpdates]);
    
            // Rediriger l'utilisateur une fois toutes les mises à jour terminées
            console.log("Toutes les modifications ont été effectuées avec succès !");
            navigate(`/ligue/${ligueId}`); 
    
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            // Afficher le message d'erreur à l'utilisateur ici, si nécessaire
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nomLigue">Nom de la ligue:</label>
                    <input type="text" value={ligue.nomLigue || ''} onChange={(e) => setLigue({...ligue, nomLigue: e.target.value})} required />
                </div>

                <div>
                    <label htmlFor="categorieLigue">Catégorie:</label>
                    <select 
                        id='categorieLigue'
                        value={ligue.categorieLigue || ''} 
                        onChange={(e) => setLigue({...ligue, categorieLigue: e.target.value})} 
                        required
                        >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="senior">Senior</option>
                        <option value="u21">u21</option>
                        <option value="u18">u18</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='anneeLigue'>Année de la ligue:</label>
                    <input 
                        id='anneeLigue'
                        type='number' min={anneeCourante} 
                        value={ligue.anneeLigue || ''} 
                        onChange={(e) => setLigue({...ligue, anneeLigue: e.target.value})} 
                        required />
                </div>

                <div>
                    <label htmlFor='nbEquipes'>Nombre d'équipes:</label>
                    <input 
                        type='number' 
                        min='0' 
                        value={ligue.nbEquipes || ''} 
                        onChange={(e) => setLigue({...ligue, nbEquipes: e.target.value})} 
                        required />
                </div>

                <div>
                    <h3>Équipes de la ligue</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipes.map(equipe => (
                                <tr key={equipe.id_equipe}>
                                    <td>{equipe.id_equipe}</td>
                                    <td>{equipe.nom}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div>
                    <label htmlFor="idModifEquipe">ID de l'équipe à ajouter ou retirer:</label>
                    <input
                        type="text"
                        value={idModifEquipe}
                        onChange={(e) => setIdModifEquipe(e.target.value)}
                    />
                    <button type="button" onClick={ajouterEquipe}>Ajouter Équipe</button>
                    <button type="button" onClick={retirerEquipe}>Retirer Équipe</button>
                </div>

                <button type="submit">Mettre à jour la ligue</button>
            </form>
        </div> 
    );
};

export default ModifierLigue;
