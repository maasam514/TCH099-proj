import React, { useState, useEffect } from "react";
import '../styles/parties.css';

function Parties(){
    const [allGames, setAllGames] = useState([]); 
    const [parties, setParties] = useState([]); 
    const [nomsEquipesDomicile, setNomsEquipesDomicile] = useState([]);
    const [nomsEquipesVisiteur, setNomsEquipesVisiteur] = useState([]);
    const [ligues, setLigues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(1); 

    useEffect(() => {
        async function fetchData() {
            try {
                const gamesResponse = await fetch('https://tch-099-proj.vercel.app/api/api/games');
                if (!gamesResponse.ok) {
                    throw new Error('Erreur dans la recuperation des parties');
                }
                const gamesData = await gamesResponse.json();
                setAllGames(gamesData);
                
                const liguesResponse = await fetch('https://tch-099-proj.vercel.app/api/api/ligues');
                if (!liguesResponse.ok) {
                    throw new Error('Erreur dans la recuperation des ligues');
                }
                const liguesData = await liguesResponse.json();
                setLigues(liguesData);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Filtrer les parties selon l'id de la ligue selectionnee.
        const filteredGames = allGames.filter(game => game.id_ligue === selectedLeague);
        setParties(filteredGames);
    }, [selectedLeague, allGames]);

    useEffect(() => {
        async function fetchTeamNames() {
            if (parties.length === 0) return;

            try {

                //Permet d'avoir tous les ids de toutes les parties obtenus par l'api a l'interieur d'un seul tableau.
                const idsEquipe = parties.flatMap(partie => [partie.id_equipe_dom, partie.id_equipe_ext]);

                //En utilisant new Set, on enleve les identifiants dupliquer, cela permettra recuperer les informations sur les equipes de maniere plus effective.
                //Array.from permet de transformer le Set en tableau.
                const idsEquipeUnique = Array.from(new Set(idsEquipe));

                //faire un appel a l'api pour avoir les informations de toutes les equipes uniques et de retourner le nom de l'equipe.
                const equipePromises = idsEquipeUnique.map(async id => {
                    const response = await fetch(`https://tch-099-proj.vercel.app/api/api/equipe/${id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch team with id ${id}`);
                    }
                    const data = await response.json();
                    return data.nom;
                });

                //tableau qui contient le nom des equipes jouant dans la ligue selectionnee
                const equipeNoms = await Promise.all(equipePromises);

                //recuperer les noms d'equipes qui sont a domicile.
                const domicileNoms = parties.map(partie =>
                    equipeNoms[idsEquipeUnique.indexOf(partie.id_equipe_dom)]
                );

                //recuperer les noms d'equipes qui sont visiteurs
                const visiteurNoms = parties.map(partie =>
                    equipeNoms[idsEquipeUnique.indexOf(partie.id_equipe_ext)]
                );

                setNomsEquipesDomicile(domicileNoms);
                setNomsEquipesVisiteur(visiteurNoms);
            } catch (error) {
                console.error('Error fetching team names:', error);
            }
        }
    
        fetchTeamNames();
    }, [parties]);

    const handleLeagueChange = async (leagueId) => {
        setSelectedLeague(leagueId);
    };

    return (
        <div className="conteneur">
                <div>
                    <section id="ligues">
                        <h2>Ligues</h2>
                        {ligues.map((ligue, index) => (
                            <button key={index} onClick={() => handleLeagueChange(ligue.id_ligue)}>{ligue.nom}</button>
                        ))}
                    </section>
                    <section id="partiesLigues">
                        <ul>
                            {parties.map((partie, index) => (
                                <li key={index} className="infoParties">
                                    <div className="informations">
                                        <div>
                                            <span className="date">{partie.date_game}</span>
                                            <span className="lieu">{partie.lieu}</span>
                                        </div>
                                        <div className="barreVerticale"> </div>
                                        <div>
                                            <span className="equipeDom">{nomsEquipesDomicile[index]}</span>
                                            <span className="equipeVis">{nomsEquipesVisiteur[index]}</span>
                                        </div>
                                        <div className="barreVerticale"></div>
                                        <button className="details">Voir plus de details</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
        </div>
    );
}

export default Parties;