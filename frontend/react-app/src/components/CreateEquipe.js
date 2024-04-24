import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateEquipe = () => {
  const navigate = useNavigate();
  const { idLigue} = useParams();
  const [equipe, setEquipe] = useState();
  const [joueurId, setJoueurId] = useState()
  const [joueurs, setJoueurs] = useState([]);

  const handleAddPlayer = async () => {
    try {
      // Fetch les informations du joueur
      let reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${joueurId}`);
      let dataJoueur = await reponse.json();
      setJoueurs([...joueurs, dataJoueur]);
      setJoueurId('');
  } catch (erreur) {
      console.error("Erreur lors de la récupération des données :", erreur);
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const infosEquipe = {
      nom: equipe.nom,
      categorie: equipe.categorie,
      idLigue: idLigue, 
      nbJoueurs: joueurs.length 
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ajoute/equipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infosEquipe),
      });
  
      const dataEquipe = await response.json();
      if (response.ok) {
        console.log("Équipe créée avec succès !", dataEquipe);
  
        const equipeId = dataEquipe.idEquipe; 

        await Promise.all(joueurs.map(joueur => 
          fetch(`http://127.0.0.1:8000/api/update/joueur/${joueur.idJoueur}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEquipe: equipeId })
          })
        ));
  
        console.log("Tous les joueurs ont été mis à jour avec le nouvel idEquipe.");
        navigate('/ligue/${idLigue}');
      } else {
        console.error("Erreur lors de la création de l'équipe : ", dataEquipe);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données : ", error);
    }
  };
  

  return (  //Formulaire de création d'équipe
  <div className="conteneur">
    <h2>Formulaire de création et d'ajout d'équipe</h2>
  <form onSubmit={handleSubmit}>
      <div>
          <label for="nom">Nom de l'équipe:</label>
          <input type="text" onChange={(e) => setEquipe({...equipe, nom: e.target.value})} required />
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

      <div>
          <label>ID de Joueur à ajouter:</label>
          <input type="number" onChange={(e) => setJoueurId(e.target.value)} />
          <button type="button" onClick={handleAddPlayer}>Ajouter</button>
        </div>
        {joueurs.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              {joueurs.map((joueur, index) => (
                <tr key={index}>
                  <td>{joueur.idJoueur}</td>
                  <td>{joueur.nom}</td>
                  <td>{joueur.prenom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

    <button type="submit">Créer l'équipe et l'ajouter à la ligue</button>
  </form>
  </div> );
}
 
export default CreateEquipe;