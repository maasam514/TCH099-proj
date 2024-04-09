import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StatistiqueJoueurPopup from "./StatistiqueJoueurPopup";
import "../styles/barreRecherche.css";

function BarreRecherche() {
    const [nomJoueur, setNomJoueur] = useState("");
    const [idJoueurSelectionne, setIdJoueurSelectionne] = useState(null);
    const { data: allJoueurs } = useQuery({
        queryKey: ['allJoueurs'],
        queryFn: fetchJoueur
    });

    useEffect(() => {
        fetchJoueur();
    }, []);

    async function fetchJoueur() {
        try {
            const informationsJoueursResponse = await fetch('https://tch-099-proj.vercel.app/api/api/joueurs');
            if (!informationsJoueursResponse.ok) {
                throw new Error('Echec lors de la récupération des joueurs');
            }

            const joueurs = await informationsJoueursResponse.json();
            const nomPlusIdJoueurs = joueurs.map(joueur => ({
                id_joueur: joueur.id_joueur,
                nom_complet: `${joueur.prenom} ${joueur.nom}`
            }));

            return nomPlusIdJoueurs;

        } catch (error) {
            console.error('Erreur dans la récupération des joueurs: ', error);
        }
    }

    const changementBarreRecherche = (event) => {
        setNomJoueur(event.target.value);
    };

    const effacerTexteBarreRecherche = () =>{
        setNomJoueur("");
    }

    //Ne pas montrer de suggestions de joueur si rien n'a ete ecrit dans la barre de recherche
    //et seulement montrer les 5 premieres correspondance du nom ecrit dans la barre de recherche
    let joueursFiltrer = [];
    if (nomJoueur.trim() !== "") {
        joueursFiltrer = allJoueurs.filter((joueur) =>
            joueur.nom_complet.toLowerCase().includes(nomJoueur.toLowerCase())
        ).slice(0, 5);
    }

    const voirStatisitqueJoueur = (idJoueur) => {
        setIdJoueurSelectionne(idJoueur);
    }

    const fermeturePopup = () => {
        setIdJoueurSelectionne(null);
    }

    return (
        <div className="conteneur-barre-recherche">
            <div className="barre-recherche">
                <input className="barre-recherche-input" type="text" placeholder="Recherche d'un joueur" value={nomJoueur} onChange={changementBarreRecherche}/>
                {nomJoueur && (
                    <button className ="effacer-texte" onClick={effacerTexteBarreRecherche}>&times;</button>
                )}
            </div>
            <div className="conteneur-liste-suggestion">
                <ul className="conteneur-suggestions-nom">
                    {joueursFiltrer.map((joueur) =>
                        <li key={joueur.id_joueur} onClick={() => voirStatisitqueJoueur(joueur.id_joueur)} className="suggestion-joueur">
                            {joueur.nom_complet}
                        </li>
                    )}
                </ul>
            </div>
            {/* Afficher les statistiques du joueur si un joueur a ete selectionne dans la barre de recherche*/}
            {/* Si aucun joueur a ete selectionne, ne pas afficher de statistiques, sauf si le popup n'a pas ete ferme. */}
            {idJoueurSelectionne && <StatistiqueJoueurPopup idJoueur={idJoueurSelectionne} onClose={fermeturePopup} />}
        </div>
    );
}

export default BarreRecherche;
