import React, { useState } from "react";
import {Link, useLocation } from 'react-router-dom';
import '../styles/BarreNav.css';

/**
 * Composant fonctionnel représentant la barre de naviguation de l'application.
 * Ce composant affiche les differentes pages disponibles sur le site web
 * ainsi qu'un bouton vers le formulaire de connexion pour les joueurs.
 * 
 * @returns {JSX.Element} Le JSX representant la barre de naviguation
 */
function BarreNav(){

    const [estConnecter , setEstConnecter]=useState(false);
    const [nomUtilisateur, setNomUtilisateur]=useState('');
    const [tokenUtilisateur, setTokenUtilisateur]=useState('');
    const { pathname } = useLocation();
    let data=[];

    /**
     * Effectue une requete a l'api afin de gerer la connexion a son compte
     * 
     * @throws {Error} Si la connexion echoue.
     * @returns {void}
     */
    const gererLaConnexion = async () =>{
        try{
            const response=await fetch('https://tch-099-proj.vercel.app/api/api/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({/*mettre les champs du login*/})
            });
            
            if(!response.ok){
                throw new Error('Echec lors de la connexion a votre compte');
            }
            data=await response.json();
            //
            setEstConnecter(true);
            setNomUtilisateur(data.utilisateur.nom);
            setTokenUtilisateur(data.token);
        }catch(error){
            console.error('Erreur lors de la connexion a votre compte:', error);
        }
    }

    /**
     * Effectue une requete a l'api pour la deconnexion de l'utilisateur
     * 
     * @throws {Error} Si la deconnexion echoue
     * @returns {null}
     */
    const gererLaDeconnexion = async() => {
        try{
            const response=await fetch ('https://tch-099-proj.vercel.app/api/api/logout',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+tokenUtilisateur
                },
            });

            if(!response.ok){
                throw new Error('Echec lors de votre deconnexion');
            }

            setEstConnecter(false);
            setNomUtilisateur(null);
            setTokenUtilisateur(null);
        }catch(error){
            console.error('Erreur lors de la deconnexion de votre comptre: ',error);
        }
    }
    return(
        <nav>
        <ul>
          <li><Link to="/" className={pathname === "/" ? "actif" : ""}>Accueil</Link></li>
          <li><Link to="/a-propos" className={pathname === "/a-propos" ? "actif" : ""}>À propos</Link></li>
          <li><Link to="/parties" className={pathname === "/parties" ? "actif" : ""}>Parties</Link></li>
          <li><Link to="/classements" className={pathname === "/classements" ? "actif" : ""}>Classements</Link></li>
          <li><Link to="/joueurs" className={pathname === "/joueurs" ? "actif" : ""}>Joueurs</Link></li>
          <li><Link to="/ligues" className={pathname === "/ligues" ? "actif" : ""}>Ligues</Link></li>
          <li><Link to="/contact" className={pathname === "/contact" ? "actif" : ""}>Contact</Link></li>
          <li>
            {estConnecter ? (
                <>
                    <span class="nom"> Bonjour {nomUtilisateur} </span>
                    <button onClick={gererLaDeconnexion}>Se déconnecter</button>
                </>
            
            ):(
                <button onClick={gererLaConnexion}>Se Connecter</button>
            )}
          </li>
        </ul>
      </nav>
    );
}
export default BarreNav;