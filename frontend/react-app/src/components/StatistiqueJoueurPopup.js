import React from "react";
import { useQuery } from "@tanstack/react-query";

function StatistiqueJoueurPopup(props) {
    const { idJoueur, onClose } = props;

    const fetchStatistiqueJoueur = async () => {
        try {
            const statistiqueJoueurResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/joueur/${idJoueur}`);
            if (!statistiqueJoueurResponse.ok) {
                throw new Error(`Echec lors de la recuperation des statistiques du joueur avec l'id ${idJoueur}`);
            }
            return await statistiqueJoueurResponse.json();
        } catch (error) {
            console.error('Erreur dans la recuperation des statistiques du joueur: ', error);
            return null;
        }
    }

    const { data: statistiquesJoueurs } = useQuery({
        queryKey: ["statistiquesJoueur", idJoueur],
        queryFn: fetchStatistiqueJoueur,
        enabled: !!idJoueur,
    });

    const fetchInformationJoueur = async () => {
        try {
            const informationsJoueurResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${idJoueur}`);
            if (!informationsJoueurResponse.ok) {
                throw new Error(`Echec lors de la recuperation des informations du joueur avec l'id ${idJoueur}`);
            }
            return await informationsJoueurResponse.json();
        } catch (error) {
            console.error('Erreur dans la recuperation des information du joueur');
            return null;
        }
    }

    const { data: infoJoueur } = useQuery({
        queryKey: ["infoJoueur", idJoueur],
        queryFn: fetchInformationJoueur,
        enabled: !!idJoueur,
    });

    
    const idEquipe =infoJoueur ? infoJoueur.id_equipe : null;

    const fetchInformationEquipe = async () => {
        try {
            const informationEquipeResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${idEquipe}`);
            if (!informationEquipeResponse.ok) {
                throw new Error(`Echec lors de la recuperation des informations de l'equipe avec l'id ${idEquipe}`);
            }
            return await informationEquipeResponse.json();
        } catch (error) {
            console.error('Erreur dans la recuperation des informations de l\'equipe: ', error);
            return null;
        }
    }

    const { data: infoEquipe } = useQuery({
        queryKey: ["infoEquipe", idEquipe],
        queryFn: fetchInformationEquipe,
        enabled: !!idEquipe
    });

    const fetchStatistiquesEquipe = async () => {
        try{
            const statistiqueEquipeResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/equipe/1`);
            if(!statistiqueEquipeResponse.ok){
                throw new Error(`Erreur lors de la recuperation des statistiques de l'equipe avec l'id ${idEquipe}`);
            }
            return await statistiqueEquipeResponse.json();
        }catch(error){
            console.error('Erreur dans la recuperation des statistiques de l\'equioe: ', error);
            return null;
        }
    }

    const { data: statistiqueEquipe } = useQuery({
        queryKey: ["statistiqueEquipe", idEquipe],
        queryFn: fetchStatistiquesEquipe,
        enabled: !!idEquipe
    });

    const fetchStatistiqueCinqDerniersMatchs = async () => {

    }

    const { data: statistiqueCinqDerniersMatchs} = useQuery({
        queryKey: ["statistiqueCinqDerniersMatchs", idEquipe, idJoueur],
        queryFn: fetchStatistiqueCinqDerniersMatchs,
        enabled: !!(idEquipe && idJoueur)
    });

    return (
        <div className="statistique-joueur-popup">
            <section className="information-equipe">
                <ul>
                    {infoEquipe && (
                        <>
                            <li>{infoEquipe.nom}</li>
                            <li>{infoEquipe.categorie}</li>
                        </>
                    )}
                </ul>
            </section>
            <section className="information-joueur">
                <ul>
                    {infoJoueur && (
                        <>
                            <li>{infoJoueur.prenom}</li>
                            <li>{infoJoueur.nom}</li>
                            <li>{infoJoueur.numero}</li>
                            <li>{infoJoueur.capitaine && <span>&#9733;</span>}</li>
                        </>
                    )}
                </ul>
            </section>
            <section className="statistique-joueur">
                <ul>
                    {statistiquesJoueurs && (
                        <>
                            <li>{statistiquesJoueurs.nbMatch}</li>
                            <li>{statistiquesJoueurs.nbButs}</li>
                            <li>{statistiquesJoueurs.nbPasses}</li>
                            <li>{statistiquesJoueurs.nbCartonJaune}</li>
                            <li>{statistiquesJoueurs.nbCartonRouge}</li>
                        </>
                    )}
                </ul>
            </section>
            <section className="statistique-equipe">
                <ul>
                    {statistiqueEquipe && (
                        <>
                            <li>{statistiqueEquipe.nbMatchs}</li>
                            <li>{statistiqueEquipe.nbVictoires}</li>
                            <li>{statistiqueEquipe.nbDefaites}</li>
                            <li>{statistiqueEquipe.nbNuls}</li>
                            <li>{statistiqueEquipe.nbPoints}</li>
                            <li>{statistiqueEquipe.nbButsPour}</li>
                            <li>{statistiqueEquipe.nbButsCointre}</li>
                        </>
                    )}
                </ul>
            </section>
            <button onClick={onClose}>Fermer</button>
        </div>
    )
}
export default StatistiqueJoueurPopup;
