import React, {useState,  useEffect} from "react";

function StatistiqueJoueurPopup(props){
    const {idJoueur, onClose} = props;
    const [statistiquesJoueurs, setStatistiquesJoueurs] = useState([]);
    const [infoJoueur, setInfoJoueur] = useState([]);
    const [infoEquipe, setInfoEquipe] = useState([]);

    useEffect(() =>{
        const fetchStatistiqueJoueur = async (idJoueur) => {
            try{
                const statistiqueJoueurResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/statistique/joueur/${idJoueur}`);
                if(!statistiqueJoueurResponse.ok){
                    throw new Error(`Echec lors de la recuperation des statistiques du joueur avec l'id ${idJoueur}`);
                }
                const statistiqueJoueurData = await statistiqueJoueurResponse.json();
                setStatistiquesJoueurs(statistiqueJoueurData);
            }catch(error){
                console.error('Erreur dans la recuperation des statistiques du joueur: ', error);
            }
        }
        fetchStatistiqueJoueur(idJoueur);
    },[idJoueur]);

    useEffect(() =>{
        const fetchInformationJoueur = async (idJoueur) => {
            try{
                const informationsJoueurResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/joueur/${idJoueur}`);
                if(!informationsJoueurResponse.ok){
                    throw new Error(`Echec lors de la recuperation des informations du joueur avec l'id ${idJoueur}`);
                }
                const informationsJoueurData = await informationsJoueurResponse.json();
                setInfoJoueur(informationsJoueurData);
            }catch(error){
                console.error('Erreur dans la recuperation des information du joueur');
            } 
        }
        fetchInformationJoueur(idJoueur);
    },[idJoueur]);

    useEffect(() =>{
        const fetchInformationEquipe = async (infoJoueur) => {
            try{
                const informationEquipeResponse = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${infoJoueur.id_equipe}`);
                if(!informationEquipeResponse.ok){
                    throw new Error(`Echec lors de la recuperation des informations de l'equipe avec l'id ${infoJoueur.id_equipe}`);
                }
                const informationEquipeData = await informationEquipeResponse.json();
                setInfoEquipe(informationEquipeData);
            }catch(error){
                console.error('Erreur dans la recuperation des informations de l\'equipe: ', error);
            }
        }
        fetchInformationEquipe(infoJoueur)

    },[infoJoueur]);

    return(
        <div className="statistique-joueur-popup">
            <section className="information-equipe">
                
            </section>
            <section className="information-joueur">

            </section>
            <section className="statistique-joueur">

            </section>
            <button onClick={onClose}>Fermer</button>
        </div>
    )
}
export default StatistiqueJoueurPopup;