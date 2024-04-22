import React, { useState} from "react";
import { fetchLigues } from "../fetch/fetchLigues";
import { useQuery } from "@tanstack/react-query";
import '../styles/parties.css';


function Parties(){
    const [ligueSelectionne, setLigueSelectionne] = useState(1); 

    const { data: ligues, isLoading: isLoadingLigues, error: erreurLigues } = useQuery({
        queryKey: ['ligues'],
        queryFn: fetchLigues,
    });

    const fetchPartiesLigues = async() => {
        try{
            const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/ligue/${ligueSelectionne}`);
            if(!response.ok){
                throw new Error('Echec de la recuperation des parties pour la ligue selectionnee');
            }
            const data = await response.json();
            return data;
        }catch(error){
            console.error('Erreur lors de la recuperation des parties pour la ligue selectionnee: ', error);
            return [];
        }
    }

    const { data: partiesLigues, isLoading: isLoadingPartiesLigues, error: erreurPartiesLigues} = useQuery({
        queryKey: ['partiesLigues', ligueSelectionne],
        queryFn: fetchPartiesLigues,
        enabled: !!ligueSelectionne,
    });

    //Permet d'avoir tous les ids de toutes les parties obtenus par l'api a l'interieur d'un seul tableau.
    const idsEquipe = partiesLigues ? partiesLigues.flatMap(partie => [partie.idEquipeDom, partie.idEquipeExt]) : [];

    //En utilisant new Set, on enleve les identifiants dupliquer, cela permettra recuperer les informations sur les equipes de maniere plus effective.
    //Array.from permet de transformer le Set en tableau.
    const idsEquipeUnique = Array.from(new Set(idsEquipe));

    const fetchNomsEquipes = async(partiesLigues) => {
        if(partiesLigues.length === 0){
            return [];
        }

        //faire un appel a l'api pour avoir les informations de toutes les equipes uniques et de retourner le nom de l'equipe.
        const equipePromises = idsEquipeUnique.map(async(id) => {
            const response = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${id}`);
            if(!response.ok){
                throw new Error(`Echec dans la recuperation de l'equipe avec l'id: ${id}`);
            }
            const data = await response.json();
            return data.nom;
        })

        //tableau qui contient le nom des equipes jouant dans la ligue selectionnee
        return Promise.all(equipePromises);
    }

    const { data: nomsEquipes, isLoading: isLoadingNomsEquipes, error: erreurNomsEquipes} = useQuery({
        queryKey: ['nomsEquipes', partiesLigues],
        queryFn: fetchNomsEquipes,
    });

    //recuperer les noms d'equipes qui sont a domicile.
    const nomsEquipesDomicile = partiesLigues ? partiesLigues.map(partie => 
        nomsEquipes ? nomsEquipes[idsEquipeUnique.indexOf(partie.idEquipeDom)] : ""
    ) : [];

    //recuperer les noms d'equipes qui sont visiteurs
    const nomsEquipesVisiteur = partiesLigues ? partiesLigues.map(partie => 
        nomsEquipes ? nomsEquipes[idsEquipeUnique.indexOf(partie.idEquipeExt)] : ""
    ) : [];

    const handleLeagueChange = async (leagueId) => {
        setLigueSelectionne(leagueId);
    };

    return (
        <div className="conteneur">
                <div>
                    <h2>Ligues</h2>
                    <section id="ligues">   
                        {isLoadingLigues ?(
                            <div>Ligues en chargement...</div>
                        ) : erreurLigues ?(
                            <div>Erreur dans le chargement des ligues: {erreurLigues.message}</div>
                        ) : (
                            ligues.map((ligue, index) => (
                                <button key={index} onClick={() => handleLeagueChange(ligue.id_ligue)} className={ligueSelectionne === ligue.id_ligue ? 'ligueActive' : ''}>{ligue.nom}</button>
                            ))
                        )}
                    </section>
                    <section id="partiesLigues">
                        {isLoadingPartiesLigues || isLoadingNomsEquipes ?(
                            <div>Parties en chargement...</div>
                        ): erreurPartiesLigues || erreurNomsEquipes ?(
                            <div>Erreur dans le chargement des parties: {erreurPartiesLigues.message}</div>
                        ): Array.isArray(partiesLigues) && partiesLigues.length > 0 ?(
                            <ul> 
                                {partiesLigues.map((partie, index) => (
                                <li key={index} className="infoParties">
                                    <div className="informations">
                                        <div>
                                            <span className="date">{partie.dateGame}</span>
                                        </div>
                                        <div className="barreVerticale"> </div>
                                        <div>
                                            <span className="equipeDom">{nomsEquipesDomicile[index]}</span>
                                            <span className="equipeDom">{nomsEquipesVisiteur[index]}</span>
                                        </div>
                                        <div className="barreVerticale"></div>
                                        <div>
                                        <span className="lieu">{partie.lieu}</span>
                                        </div>
                                        <div className="barreVerticale"></div>
                                        <button className="details">Voir plus de details</button>
                                    </div>
                                </li>
                                ))}
                            </ul> 
                        ) : (
                            <div>Aucune partie trouvee pour la ligue selectionnee</div>
                        )}
                    </section>
                </div>
        </div>
    );
}

export default Parties;