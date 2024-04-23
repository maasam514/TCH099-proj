import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateMatch = () => {
    const navigate = useNavigate();
    const { idLigue } = useParams();
    const [game, setGame] = useState({
        dateGame: "",
        lieu: "",
        idLigue: idLigue,
        idEquipeDom: "",
        idEquipeExt: ""
    });
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        const fetchDonnees = async () => {
            try {
                let reponseEquipes = await fetch(`https://tch-099-proj.vercel.app/api/api/ligue/${idLigue}/equipes`);
                let dataEquipes = await reponseEquipes.json();
                setEquipes(dataEquipes);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données :", erreur);
            }
        };

        fetchDonnees();
    }, [idLigue]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`https://your-api-endpoint.com/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });
    
            if (response.ok) {
                console.log("Match créé avec succès !");
                navigate(`/ligue/${idLigue}`);
            } else {
                console.error("Erreur lors de la création du match");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du match :", error);
        }
    };

    return ( 
    <div className="conteneur">
        <h2>Formulaire de création de partie</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Date et heure : </label>  
            <input
                type="datetime-local"
                value={game.dateGame}
                onChange={(e) => setGame({ ...game, dateGame: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Lieu : </label>
            <input
                type="text"
                value={game.lieu}
                onChange={(e) => setGame({ ...game, lieu: e.target.value })}
                required
            />
            </div>
            <div>
            <label>Équipe domicile : </label>
            <select
                value={game.idEquipeDom}
                onChange={(e) => setGame({ ...game, idEquipeDom: e.target.value })}
                required
            >
                <option value="">Sélectionnez l'équipe à domicile</option>
                {equipes.map(equipe => (
                    <option key={equipe.idEquipe} value={equipe.idEquipe}>
                        {equipe.nom}
                    </option>
                ))}
            </select>
            </div>
            <div>
            <label>Équipe visiteuse :</label>
            <select
                value={game.idEquipeExt}
                onChange={(e) => setGame({ ...game, idEquipeExt: e.target.value })}
                required
            >
                <option value="">Sélectionnez l'équipe visiteuse</option>
                {equipes.map(equipe => (
                    <option key={equipe.idEquipe} value={equipe.idEquipe}>
                        {equipe.nom}
                    </option>
                ))}
            </select>
            </div>
        <button type="submit">Créer le match</button>
    </form>
    </div> 
    );
}
 
export default CreateMatch;