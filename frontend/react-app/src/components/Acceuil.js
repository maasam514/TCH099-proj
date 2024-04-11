import React from "react";
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "../styles/Acceuil.css";
import { fetchLigues } from "../fetch/fetchLigues";
import { Link } from 'react-router-dom';

function Accueil() {
    const { data: ligues, isLoading: isLoadingLigues, error: erreurLigues } = useQuery({
        queryKey: ['ligues'],
        queryFn: fetchLigues,
    });

    const [idLigueSelectionne, setIdLigueSelectionne] = React.useState(1);
    const [ligueActive, setLigueActive] = React.useState(1);

    // Handle un clique sur le nom d'une ligue
    const handleLigueClick = (id) => {
        setIdLigueSelectionne(id);
        setLigueActive(id);
    };

    // Verfifier si le match se dispute durant la semaine courante
    const estDansLaSemaine = (datePartie, debutSemaine, finSemaine) => {
        const date = new Date(datePartie);
        return date >= debutSemaine && date <= finSemaine;
    };

    // Obtenir la date de debut et de fin de la semaine courante.
    const debutSemaine = moment().startOf('isoWeek').toDate();
    const finSemaine = moment().endOf('isoWeek').toDate();

    // Fetch les parties pour la ligue selectionnee
    const { data: parties, isLoading: isLoadingParties, error: erreurParties } = useQuery({
        queryKey: ['parties', idLigueSelectionne],
        queryFn: () => fetchParties(idLigueSelectionne),
        enabled: !!idLigueSelectionne,
    });

    // Fonction qui fait le fetch pour donner les parties de la ligue selectionnee
    const fetchParties = async (id) => {
        try {
            const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/ligue/${id}`);
            if (!response.ok) {
                throw new Error('Echec lors de la recuperation des parties pour la ligue');
            }
            const data = await response.json();
            const partiesDeLaSemaine = filtrerPartiesDeLaSemaine(data);
            return await fetchInformationPartie(partiesDeLaSemaine.map(partie => partie.id_game));
        } catch (error) {
            console.error('Erreur lors de la recuperation des parties: ', error);
            return [];
        }
    };

    // Fonction pour obtenir les informations sur une partie en particulier en fournissant l'id de la partie.
    const fetchInformationPartie = async (idsParties) => {
        try {
            const informationPartiesPromesses = idsParties.map(async id => {
                const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/${id}`);
                if (!response.ok) {
                    throw new Error(`Echec lors de la récupération des détails de la partie avec l'id ${id}`);
                }
                return await response.json();
            });
            return await Promise.all(informationPartiesPromesses);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails des parties:', error);
            return [];
        }
    };

    // Fonction qui filtre les parties pour obtenir, celle qui seront jouees durant la semaine courante.
    const filtrerPartiesDeLaSemaine = (parties) => {
        return parties.filter(partie => estDansLaSemaine(partie.date, debutSemaine, finSemaine));
    };

    return (
        <div className="conteneur">
            <section className="connexion">
                <h2>Rejoignez vos coéquipiers <br />et vos adversaires.</h2>
                <h3>Vous faites partie d'une équipe ?</h3>
                <span>Connectez-vous à votre compte personnel pour pouvoir visualiser vos statistiques personnelles, celles de votre équipe et de tous les autres joueurs dans votre ligue.</span><br />
                <span>Créez votre compte dès aujourd'hui !</span><br />
                <Link to='/registration'>
                <button id="register">Inscrivez-vous maintenant !</button>
                </Link>
            </section>
            <div id="calendrier">
                <span>Calendrier des parties: </span>
                <Calendar minDetail="year"></Calendar>
            </div>
            <h1 id="resultatsHebdomadaire">RÉSULTATS DE LA SEMAINE</h1>
            <ul id="ligues">
                {/* Render ligues */}
                {isLoadingLigues ? (
                    <li>Ligues en chargement...</li>
                ) : erreurLigues ? (
                    <li>Erreur dans le chargement des ligues: {erreurLigues.message}</li>
                ) : (
                    ligues.map(ligue => (
                        <li 
                            key={ligue.id_ligue} 
                            onClick={() => handleLigueClick(ligue.id_ligue)} 
                            className={ligueActive === ligue.id_ligue ? 'ligueActive' : ''}
                        >
                            {ligue.nom}
                        </li>
                    ))
                )}
            </ul>
            <ul id="partiesSemaine">
                {isLoadingParties ? (
                    <li>Parties en chargement...</li>
                ) : erreurParties ? (
                    <li>Erreur dans le chargement des parties: {erreurParties.message}</li>
                ) : (
                    parties && parties.length > 0 ? (
                        parties.map(partie => (
                            <li key={partie.id_game}>
                                <span id="equipeDom">{partie.equipeDom}</span>
                                <span id="equipeVis">{partie.equipeVis}</span>
                                <span id="lieu">{partie.lieu}</span>
                                <span id="date">{partie.date}</span>
                            </li>
                        ))
                    ) : (
                        <li>Aucune partie à afficher pour cette semaine</li>
                    )
                )}
            </ul>
        </div>
    );
}

export default Accueil;
