import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const ProfilJoueur = () => {
    const { joueurId } = useParams();
    const [infoJoueur, setInfoJoueur] = useState(null);
    const [infoEquipe, setInfoEquipe] = useState(null);
    const [statEquipe, setStatEquipe] = useState(null);
    const [statJoueur, setStatJoueur] = useState(null);

    useEffect(() => {
        const fetchDonnees = async () => {
            try {
                // Fetch les informations du joueur
                let reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${joueurId}`);
                let dataJoueur = await reponse.json();
                setInfoJoueur(dataJoueur);

                // Fetch les informations de l'équipe en utilisant l'ID d'équipe du joueur
                reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${dataJoueur.id_equipe}`);
                let data = await reponse.json();
                setInfoEquipe(data);

                // Fetch des statistiques de l'équipe en utilisant l'ID d'équipe du joueur
                reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/equipe/${dataJoueur.id_equipe}`);
                data = await reponse.json();
                setStatEquipe(data);

                // Fetch des statistiques  du joueur
                reponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/joueur/${joueurId}`);
                data = await reponse.json();
                setStatJoueur(data);
            } catch (erreur) {
                console.error("Erreur lors de la récupération des données :", erreur);
            }
        };

        fetchDonnees();
    }, [joueurId]); 
    
    return (
    <div className="conteneur">
        <div>
            <h2>Informations du Joueur</h2>    
            {infoJoueur ? (
                <div>
                    <p>Nom : {infoJoueur.prenom} {infoJoueur.nom}</p>
                    <p>Email : {infoJoueur.courriel}</p>
                    <p>Date de naissance : {infoJoueur.date_de_naissance}</p>
                    <p>Équipe : {infoEquipe ? infoEquipe.nom : 'Chargement des informations de l\'équipe...'}</p>
                </div>
            ) : (
                <p>Chargement des informations du joueur...</p>
            )}   
        </div>
        <div>
            <h2>Équipe</h2>
            {infoEquipe ? (
                <table>
                    <thead>
                        <tr>
                            <th>Équipe</th>
                            <th>Catégorie</th>
                            <th>Match joué</th>
                            <th>Points</th>
                            <th>Victoire</th>
                            <th>Défaite</th>
                            <th>Nul</th>
                            <th>But pour</th>
                            <th>But contre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{infoEquipe.nom}</td>
                            <td>{infoEquipe.categorie}</td> 
                            <td>{statEquipe ? statEquipe.nbMatchs : 'Chargement...'}</td> 
                            <td>{statEquipe ? statEquipe.nbPoints : 'Chargement...'}</td> 
                            <td>{statEquipe ? statEquipe.nbVictoires : 'Chargement...'}</td>
                            <td>{statEquipe ? statEquipe.nbDefaites : 'Chargement...'}</td>
                            <td>{statEquipe ? statEquipe.nbNuls : 'Chargement...'}</td> 
                            <td>{statEquipe ? statEquipe.nbButsPour : 'Chargement...'}</td> 
                            <td>{statEquipe ? statEquipe.nbButsContre : 'Chargement...'}</td> 
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Chargement des informations de l'équipe...</p>
            )}
        </div>
        <div>
            <h2>Statistiques du joueur</h2>
            {statJoueur ? (
                <table>
                    <thead>
                        <tr>
                            <th>But</th>
                            <th>Passe</th>
                            <th>Carton jaune</th>
                            <th>Carton rouge</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{statJoueur.nbButs}</td>
                            <td>{statJoueur.nbPasses}</td>
                            <td>{statJoueur.nbCartonJaune}</td>
                            <td>{statJoueur.nbCartonRouge}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Chargement des statistiques du joueur...</p>
            )}
        </div>
    </div>
    );
};
 
export default ProfilJoueur;