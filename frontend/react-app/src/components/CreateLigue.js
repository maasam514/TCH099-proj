import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateLigue = () => {
    const navigate = useNavigate();
    const anneeCourante = new Date().getFullYear(); // Obtient l'année courante
    const [ligue, setLigue] = useState({
        nom: '',
        categorie: '',
        annee: anneeCourante,
        idGestionnaire: '1000',
        nbEquipes: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = "99|bje8yK9OjfqTIPF1ZXL4kNjM33zxFluVGuwX8eKObc4f5139";

        try {
        const response = await fetch('https://tch-099-proj.vercel.app/api/api/ligue', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${token}' 
            },
            body: JSON.stringify(ligue),
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("Ligue créée avec succès !");
            navigate('/ligues');
        } else {
            // Gestion des réponses d'erreur de l'API
            console.error("Erreur lors de la création de la ligue : ", response.statusText, response);
        }
        } catch (error) {
        // Gestion des erreurs de réseau/connexion
        console.error("Erreur lors de l'envoi des données : ", error);
        }
    }

    return ( 
    <div className="conteneur">
        <form onSubmit={handleSubmit}>
            <h2>Formulaire de céation de ligue</h2>
            <div>
                <label for="nom">Nom de la ligue:</label>
                <br/>
                <input type="text" onChange={(e) => setLigue({...ligue, nom: e.target.value})} required />
            </div>

            <div>
                <label for="categorie">Catégorie:</label>
                <br/>
                <select onChange={(e) => setLigue({...ligue, categorie: e.target.value})} required>
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="senior">Senior</option>
                    <option value="u21">u21</option>
                    <option value="u18">u18</option>
                </select>
            </div>

            <div>
                <label htmlFor='anneeLigue'>Année de la ligue:</label>
                <br/>
                <input type='number' min={anneeCourante} value={ligue.annee} onChange={(e) => setLigue({...ligue, annee: e.target.value})} required />
            </div>

            <div>
                <label for='nbEquipes'>Nombre d'équipes:</label>
                <br/>
                <input type='number' min='0' onChange={(e) => setLigue({...ligue, nbEquipes: e.target.value})} required />
            </div>

            <p>(Vous pourrez ensuite créer et ajouter des équipes dans la page correspondante à cette ligue.)</p>


            <button type="submit">Soumettre</button>
        </form>
    </div> 
    );
}
 
export default CreateLigue;