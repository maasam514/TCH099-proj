import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierEquipe = () => {
    const { equipeId } = useParams();
    const navigate = useNavigate();
    const [equipe, setEquipe] = useState({
        nom: '', 
        image: '',
        categorie: '',
    });
    const [joueurs, setJoueurs] = useState([]);
    const [nouveauxJoueurs, setNouveauxJoueurs] = useState([]);
    const [joueursRetires, setJoueursRetires] = useState([]);
    const [idModifJoueur, setIdModifJoueur] = useState('');

    //initialise les états de l'équipe et de ses joueurs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [equipeResponse, joueursResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/equipe/${equipeId}`),
                    fetch(`http://127.0.0.1:8000/api/equipe/${equipeId}/joueurs`)
                ]);

                if (!equipeResponse.ok || !joueursResponse.ok) {
                    throw new Error('Erreur lors du chargement des données');
                }

                const equipeData = await equipeResponse.json();
                const joueursData = await joueursResponse.json();

                setEquipe(equipeData);
                setJoueurs(joueursData);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
                // Afficher le message d'erreur à l'utilisateur ici, si nécessaire
            }
        };

        fetchData();
    }, [equipeId]);

        // Ajoute le joueur à l"équipe
    const ajouterJoueur = async () => {
        if (!idModifJoueur) {
            console.error("Veuillez saisir un ID de joueur.");
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/joueur/${idModifJoueur}`);
            if (!response.ok) {
                throw new Error(`Échec de la récupération des détails du joueur`);
            }
            const joueurData = await response.json();
    
            // Ajouter le joueur à la liste des joueurs de l'équipe
            setJoueurs(prevJoueurs => [...prevJoueurs, joueurData]);
    
            // Ajouter le joueur à la liste des nouveaux joueurs
            setNouveauxJoueurs(prevNouveauxJoueurs => [...prevNouveauxJoueurs, joueurData]);
    
            setIdModifJoueur(''); // Réinitialiser le champ idModifJoueur pour l'ajout de nouveaux joueurs
        } catch (error) {
            console.error("Erreur lors de l'ajout du joueur :", error);
        }
    };

        // Retire le joueur de l'équipe
    const retirerJoueur = () => {
        if (!idModifJoueur) {
            console.error("Veuillez saisir un ID de joueur.");
            return;
        }
    
        // Trouver le joueur à retirer dans la liste des joueurs
        const joueurARetirer = joueurs.find(joueur => joueur.id.toString() === idModifJoueur);
        
        // Vérifie si le joueur a été trouvé
        if (joueurARetirer) {
            // Retire le joueur de la liste des joueurs
            setJoueurs(prevJoueurs => prevJoueurs.filter(joueur => joueur.id.toString() !== idModifJoueur));
    
            // Ajoute le joueur retiré à la liste des joueurs retirés
            setJoueursRetires(prevJoueursRetires => [...prevJoueursRetires, joueurARetirer]);
        } else {
            console.error("Joueur non trouvé.");
        }
    
        // Réinitialise l'ID après le retrait du joueur
        setIdModifJoueur('');
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Mise à jour des informations de l'équipe
            const equipeResponse = await fetch(`http://127.0.0.1:8000/api/modifier/equipe/${equipeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(equipe),
            });
    
            if (!equipeResponse.ok) {
                throw new Error('Erreur lors de la modification de léquipe');
            }
    
            // Mise à jour des joueurs ajoutés
            const joueurUpdates = nouveauxJoueurs.map(joueur =>
                fetch(`http://127.0.0.1:8000/api/modifier/joueur/${joueur.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...joueur, id_equipe: equipeId }),
                })
            );
    
            // Réinitialisation de l'id_equipe des joueurs retirés
            const joueurRetiresUpdates = joueursRetires.map(joueur =>
                fetch(`http://127.0.0.1:8000/api/modifier/joueur/${joueur.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...joueur, id_equipe: null }),
                })
            );
    
            // Attendre que toutes les mises à jour des joueurs soient terminées
            await Promise.all([...joueurUpdates, ...joueurRetiresUpdates]);
    
            // Rediriger l'utilisateur une fois toutes les mises à jour terminées
            console.log("Équipe et joueurs modifiés avec succès !");
            navigate(`/equipe/${equipeId}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            // Afficher le message d'erreur à l'utilisateur ici, si nécessaire
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom de l'équipe:</label>
                    <input
                        type="text"
                        id="nom"
                        value={equipe.nom || ''}
                        onChange={(e) => setEquipe({ ...equipe, nom: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Emblème de l'équipe:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setEquipe({ ...equipe, image: e.target.files[0] })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="categorie">Catégorie:</label>
                    <select
                        id="categorie"
                        value={equipe.categorie || ''}
                        onChange={(e) => setEquipe({ ...equipe, categorie: e.target.value })}
                        required
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="senior">Senior</option>
                        <option value="u21">u21</option>
                        <option value="u18">u18</option>
                    </select>
                </div>

                <div>
                    <h3>Joueurs de l'équipe</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Numéro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {joueurs.map(joueur => (
                                <tr key={joueur.id}>
                                    <td>{joueur.id}</td>
                                    <td>{joueur.nom}</td>
                                    <td>{joueur.prenom}</td>
                                    <td>{joueur.numero}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div>
                    <label htmlFor="idModifJoueur">ID du joueur à ajouter ou retirer :</label>
                    <input
                        type="text"
                        id="idModifJoueur"
                        value={idModifJoueur}
                        onChange={(e) => setIdModifJoueur(e.target.value)}
                    />
                    <button type="button" onClick={ajouterJoueur}>Ajouter Joueur</button>
                    <button type="button" onClick={retirerJoueur}>Retirer Joueur</button>
                </div>
                                
                <button type="submit">Mettre à jour l'équipe</button>
            </form>
        </div>
    );
};

export default ModifierEquipe;
