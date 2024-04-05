import React, {useState, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import StatistiqueJoueurPopup from "./StatistiqueJoueurPopup";

function BarreRecherche(){
    const [nomJoueur, setNomJoueur] = useState("");
    const [idJoueurSelectionne, setIdJoueurSelectionne] = useState(null);

    const fetchJoueur = async () => {
        try {
            const informationsJoueursResponse = await fetch('https://tch-099-proj.vercel.app/api/api/joueurs');
            if (!informationsJoueursResponse.ok) {
                throw new Error('Echec lors de la récupération des joueurs');
            }

            return await informationsJoueursResponse.json();
            
        } catch (error) {
            console.error('Erreur dans la récupération des joueurs: ', error);
        }
    };

    const {data: allJoueurs} = useQuery({
        queryKey:['allJoueurs'],
        queryFn: fetchJoueur
    });


    const changementBarreRecherche = (event) =>{
        setNomJoueur(event.target.value);
    };

    const joueursFiltrer = allJoueurs ? allJoueurs.filter((joueur) => 
        joueur.nom.toLowerCase().includes(nomJoueur.toLowerCase()) || joueur.prenom.toLowerCase().includes(nomJoueur.toLowerCase())
    ):[];

    const voirStatisitqueJoueur = (idJoueur) =>{
        setIdJoueurSelectionne(idJoueur);
    }

    const fermeturePopup = () =>{
        setIdJoueurSelectionne(null);
    }


    return(
        <div>
            <input type="text" placeholder="Recherche d'un joueur" value={nomJoueur} onChange={changementBarreRecherche}/>
            <ul>
                {joueursFiltrer.map((joueur)=>
                <li key={joueur.id_joueur} onClick={voirStatisitqueJoueur(joueur.id_joueur)}>
                    <span className="prenom">{joueur.prenom}</span>
                    <span className="nom">{joueur.nom}</span>
                </li>
                )}
            </ul>
            {/* Afficher les statistiques du joueur si un joueur a ete selectionne dans la barre de recherche*/}
            {/* Si aucun joueur a ete selectionne, ne pas afficher de statistiques, sauf si le popup n'a pas ete ferme. */}
            {idJoueurSelectionne && <StatistiqueJoueurPopup idJoueur={idJoueurSelectionne} onClose={fermeturePopup} />}
        </div>
    );
}
export default BarreRecherche;