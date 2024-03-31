import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "./Acceuil.css";

/**
 * Composant fonctionnel représentant la page d'accueil de l'application.
 * Ce composant affiche les informations sur les ligues, les parties de la semaine,
 * ainsi qu'un bouton vers le formulaire d'inscription pour les joueurs et une image illustrative.
 * 
 * @returns {JSX.Element} Le JSX représentant la page d'accueil.
 */
function Accueil() {
    const [ligues, setLigues] = useState([]);
    const [idLigueSelectionne, setIdLigueSelectionne] = useState(null);
    const [parties, setParties] = useState([]);
    const [ligueActive, setLigueActive] = useState(null);

    //fonction qui handle un click sur le nom d'une ligue
    const handleLigueClick = (id) => {
        setIdLigueSelectionne(id);
        setLigueActive(id);
    };

   

    /**
    * Obtient les informations des parties à partir de l'API en utilisant les IDs fournis.
    * 
    * @param {number[]} idsParties - Tableau contenant les IDs des parties.
    * @returns {Promise<object[]>} Les informations des parties au format JSON avec les champs "id_game","date","lieu","equipeDom","equipeVis" et "id_ligue".
    * @throws {Error} Si la récupération des détails d'une partie échoue.
    */
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

    /**
    * Vérifie si une partie se joue dans la semaine actuelle.
    * 
    * @param {Date} datePartie - La date de la partie.
    * @param {Date} debutSemaine - La date de début de la semaine (format JavaScript Date).
    * @param {Date} finSemaine - La date de fin de la semaine (format JavaScript Date).
    * @returns {boolean} True si la date de la partie est dans la semaine actuelle, false sinon.
    */
    const estDansLaSemaine = (datePartie, debutSemaine, finSemaine) => {
        const date = new Date(datePartie);
        return date >= debutSemaine && date <= finSemaine;
    };

    useEffect(() => {
        /**
        * Effectue une requête à l'API pour récupérer la liste des ligues et met à jour l'état des ligues et de la ligue active.
        * 
        * @returns {Promise<Object[]>} Un tableau d'objet JSON contenant les informations des ligues avec les champs id_ligue", "nom", "categorie", "annee", "nb_equipe" et "id_gestionnaire"
        * @throws {Error} Si la recuperation des ligues echoue
        */
        async function fetchLigues() {
            try {
                const response = await fetch('https://tch-099-proj.vercel.app/api/api/ligues');
                if (!response.ok) {
                    throw new Error('Echec lors de la recuperation des ligues');
                }
                const data = await response.json();
                setLigues(data);
                //par defaut la premiere ligue aura le statut actif
                setLigueActive(data[0].id_ligue);
            } catch (error) {
                console.error('Erreur dans la recuperation des ligues:', error);
            }
        }
        fetchLigues();
    }, []);

    useEffect(() => {

        /**
        * Effectue une requête à l'API pour obtenir toutes les parties d'une ligue et les filtre
        * pour obtenir seulement celles qui seront jouées dans la semaine actuelle.
        * 
        * @param {number} id - L'identifiant de la ligue pour laquelle récupérer toutes les parties.
        * @returns {Promise<Object[]>} Un tableau JSON de toutes les parties qui seront jouées durant la semaine actuelle.
        * @throws {Error} Si la récupération des parties échoue.
        */
        const fetchParties = async (id) => {
            try {
                const response = await fetch(`https://tch-099-proj.vercel.app/api/api/game/ligue/${id}`);
                if (!response.ok) {
                    throw new Error('Echec lors de la recuperation des parties pour la ligue');
                }
                const data = await response.json();
                //filtrer pour obtenir seuelement les parties qui seront jouees cette semaine.
                const partiesDeLaSemaine = filtrerPartiesDeLaSemaine(data);
                const informationsParties = await fetchInformationPartie(partiesDeLaSemaine.map(partie => partie.id_game));
                setParties(informationsParties);
            } catch (error) {
                console.error('Erreur lors de la recuperation des parties: ', error);
            }
        };

        /**
         * Filtrer les parties pour obtenir uniquement celles qui seront jouées durant la semaine actuelle.
         * 
         * @param {Object[]} parties - Un tableau JSON contenant l'information sur les parties à filtrer.
         * @returns {Object[]} Un tableau JSON contenant seulement les informations des parties qui seront jouées durant la semaine.
         */
        const filtrerPartiesDeLaSemaine = (parties) => {
        //donne le jour du debut de la semaine selon les normes ISO 8601 (soit le lundi)
        const debutSemaine = moment().startOf('isoWeek').toDate();
        //donne le jour de la fin de la semaine selon lles normes ISO 8601 (soit le dimanche)
        const finSemaine = moment().endOf('isoWeek').toDate();
        return parties.filter(partie => estDansLaSemaine(partie.date, debutSemaine, finSemaine));
        };
    
        //si on clicke sur le nom d'une autre ligue, avoir les parties pour cette ligue seulement.
        if (idLigueSelectionne !== null) {
            fetchParties(idLigueSelectionne);
        }
    }, [idLigueSelectionne]);

    return (
        <div className="conteneur">
            <section className="connexion">
                <h2>Rejoignez vos coéquipiers <br />et vos adversaires.</h2>
                <h3>Vous faites partie d'une équipe ?</h3>
                <span>Connectez-vous à votre compte personnel pour pouvoir visualiser vos statistiques personnelles, celles de votre équipe et de tous les autres joueurs dans votre ligue.</span><br />
                <span>Créez votre compte dès aujourd'hui !</span><br />
                <button id="register">Inscrivez-vous maintenant !</button>
            </section>
            <div id="calendrier">
                <span>Calendrier des parties: </span>
                <Calendar minDetail="year"></Calendar>
            </div>
            <h1 id="resultatsHebdomadaire">RÉSULTATS DE LA SEMAINE</h1>
            <ul id="ligues">
                {ligues.map(ligue => (
                    <li 
                    key={ligue.id_ligue} 
                    onClick={() => handleLigueClick(ligue.id_ligue)} 
                    className={ligueActive === ligue.id_ligue ? 'ligueActive' : ''}>
                        {ligue.nom}
                    </li>
                ))}
            </ul>
            <ul id="partiesSemaine">
            {parties.length > 0 ? (
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
            )}
            </ul>
        </div>
    );
}

export default Accueil;
