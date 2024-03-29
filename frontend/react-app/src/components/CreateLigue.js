import { useState } from "react";

const CreateLigue = () => {
    const anneeCourante = new Date().getFullYear(); // Obtient l'année courante
    const [ligue, setLigue] = useState({
        nomLigue: '',
        categorieLigue: '',
        anneeLigue: anneeCourante,
        nbEquipes: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://127.0.0.1:8000/api/ajoute/ligue', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(ligue),
        });
        
        if (response.ok) {
            // La requête a réussi, vous pouvez par exemple rediriger l'utilisateur ou afficher un message de succès
            console.log("Équipe créée avec succès !");
            // Reset le formulaire ou redirection ici
        } else {
            // Gestion des réponses d'erreur de l'API
            console.error("Erreur lors de la création de l'équipe : ", response.statusText);
        }
        } catch (error) {
        // Gestion des erreurs de réseau/connexion
        console.error("Erreur lors de l'envoi des données : ", error);
        }
    }

    return ( 
    <div>
        <form onSubmit={handleSubmit}>
        <div>
            <label for="nom">Nom de la ligue:</label>
            <input type="text" onChange={(e) => setLigue({...ligue, nomLigue: e.target.value})} required />
        </div>

        <div>
            <label for="categorie">Catégorie:</label>
            <select onChange={(e) => setLigue({...ligue, categorieLigue: e.target.value})} required>
                <option value="">Sélectionnez une catégorie</option>
                <option value="senior">Senior</option>
                <option value="u21">u21</option>
                <option value="u18">u18</option>
            </select>
        </div>

        <div>
            <label htmlFor='anneeLigue'>Année de la ligue:</label>
            <input type='number' min={anneeCourante} value={ligue.anneeLigue} onChange={(e) => setLigue({...ligue, anneeLigue: e.target.value})} required />
        </div>

        <div>
            <label for='nbEquipes'>Nombre d'équipes:</label>
            <input type='number' min='0' onChange={(e) => setLigue({...ligue, nbEquipes: e.target.value})} required />
        </div>

        <button type="submit">Soumettre</button>
        </form>
    </div> 
    );
}
 
export default CreateLigue;