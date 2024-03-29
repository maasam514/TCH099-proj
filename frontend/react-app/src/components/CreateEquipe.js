import { useState } from "react";

const CreateEquipe = () => {
  const [equipe, setEquipe] = useState({
    nom: '', 
    image: '',
    categorie: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/ajoute/equipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipe),
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
  };
  

  return (  //Formulaire de création d'équipe
  <div>
  <form onSubmit={handleSubmit}>
      <div>
          <label for="nom">Nom de l'équipe:</label>
          <input type="text" onChange={(e) => setEquipe({...equipe, nom: e.target.value})} required />
      </div>

      <div>
          <label for="image">Emblème de l'équipe:</label>
          <input type="file" onChange={(e) => setEquipe({...equipe, image: e.target.value})} required />
      </div>

      <div>
          <label for="categorie">Catégorie:</label>
          <select onChange={(e) => setEquipe({...equipe, categorie: e.target.value})} required>
              <option value="">Sélectionnez une catégorie</option>
              <option value="senior">Senior</option>
              <option value="u21">u21</option>
              <option value="u18">u18</option>
          </select>
      </div>

    <button type="submit">
      Soumettre
    </button>
  </form>
  </div> );
}
 
export default CreateEquipe;