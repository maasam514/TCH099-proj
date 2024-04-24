import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


export default function Registration(){

    const[nom, ajoutNom] = useState('');
    const[nomError, setNomError] = useState('');
    const[prenom, ajoutPrenom] = useState('');
    const[prenomError, setPrenomError] = useState('');
    const[telephone, ajoutTelephone] = useState('');
    const[telephoneError, setTelephoneError] = useState('');
    const[email, ajoutEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, ajoutPassword] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[date_de_naissance, ajoutDateDeNaissance] = useState('');
    const[dateError, setDateError] = useState('');
    const [messageError, setMessageError] = useState('');
    const[role_utilisateur, ajoutUtilisateur] = useState('Joueur');

    const navigate = useNavigate();
    

    const RegistrationUtilisateur = async (e) => {
        e.preventDefault();

        if (validationInformation()) {

            try {

                
                const response = await fetch("https://tch-099-proj.vercel.app/api/api/register", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nom: nom,
                        email: email,
                        mot_de_passe: password,
                        role_utilisateur: 'joueur'
                    })
                });

                
                //Si l'inscription n'est pas accepter alors un message erreur va informer l'utilisateur
                if (!response.ok) {
                    toast.error(response.message || 'Deja un utilisateur avec l\'email '+email);
                    setMessageError('Deja un utilisateur avec l\'email: '+email);

                }
                else{

                    toast.success('Registration avec succes');
                    //RegistrationInfoJoueur();
                    navigate('/login');
                }

                
            } catch (error) {
                console.log('Error:', error); 
                toast.warning('Echouer: ' + error.message);
            }

            //Aurait aimer implimenter le login pour ajouter les information aussi dans le tableau Jouer de la BD mais on a une erreur
            /*
                try {
                    
                    const response = await fetch("https://tch-099-proj.vercel.app/api/api/joueur", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            prenom: prenom,
                            nom: nom,
                            num_tel: telephone,
                            courriel: email,
                            capitaine: 0,
                            numero: 0,
                            id_equipe: 0,
                            date_de_naissance: date_de_naissance,
                            joueur_nom: nom,
                            equipe_nom: 0
    
                        })
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    toast.success('Registration avec succes');
                    //RegistrationInfoJoueur();
                    //navigate('/login_pt2');
                } catch (error) {
                    console.log('Error:', error); // Log the error to console
                    toast.warning('Echouer: ' + error.message);
                }
            }

            */
            
            
        }
    }

    
    //Faire la validation pour avoir aucun champ vide
    const validationInformation = () => {
        let isValid = true;

        
        if (!verifierEmail(email)){
            isValid = false;
            setEmailError('Oubliez de rentrer votre Email');
        }
        else{
            setEmailError('');
        }

        if (nom==='' || nom === null){
            isValid = false;
            setNomError('Oubliez de rentrer votre Nom')
        }
        else{
            setNomError('');
        }

        if (prenom==='' || prenom === null){
            isValid = false;
            setPrenomError('Oubliez de rentrer votre Prenom');
        }
        else{
            setPrenomError('');
        }

        if (!verifierMotsDePasse(password)){
            isValid = false;
            setPasswordError('Manque des characteres pour votre Mots de passe')
        
        }
        else {
            setPasswordError('');
        }

        if (!verifierDateNaissance(date_de_naissance)){
            isValid = false;
            setDateError('Rentrer votre date de naissance dans ce format: YYYY-MM-DD et une année valide');
        }
        else {
            setDateError('');
        }

        if (!verifierTelephone(telephone)){
            isValid = false;
            setTelephoneError('Rentrer votre numero de telephone dans ce format: 1231231234');
        }
        else{
            setTelephoneError('');
        }

        
        

        return isValid;
    };

    const verifierMotsDePasse = (passe) => {

        // Vérifier si la chaîne contient au moins une majuscule, une minuscule et un chiffre
        const contientMajuscule = /[A-Z]/.test(passe);
        const contientMinuscule = /[a-z]/.test(passe);
        const contientChiffre = /\d/.test(passe);
        const lengthMotsPasse = passe.length >= 9 ;
    
        // Retourner vrai si la chaîne respecte le format, sinon retourner faux
        return contientMajuscule && contientMinuscule && contientChiffre && lengthMotsPasse;
    }

    const verifierDateNaissance = (date) =>{

        //C'est le format YYYY-MM-DD
        const dateValide = /^\d{4}-\d{2}-\d{2}$/;

        //Verifier si c'est le bon format YYYY-MM-DD
        if (!dateValide.test(date)){
            return false;
        }

        //Chercher les donneer individuelle de l'annee, mois, joueur
        const [annee, mois, jour] = date.split('-').map(Number);

        //Verifier en general si les donnee son bonne

        if (mois < 1|| mois > 12|| jour < 1 || jour > 31 || annee < 1900 || annee >2024){
            //Donnee hors limites
            return false;
        }

        //Verifier les mois avec moins de 31 jours
        const moisAvec31Jours = [1,3,5,7,8,10,12];

        //Verifier si les mois on 31 jours ou pas 
        if (jour > 30 && !moisAvec31Jours.includes(mois)){
            //Il il n'y a pas de 31 jours ou plus 
            return false;
        }

        //Verifier pour le mois de fevrier

        if (mois === 2){

            //Verifier si c'est une annee bissextile
            if ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0){

                //L'annee bissextile possede 29 jours
                if (jour > 29){
                    return false;
                }

            }
            else {
                //L'annee non bissextile possede 28 jours
                if (jour > 28){
                    return false;
                }
            }
        }

        return true;
                
    }

    const verifierTelephone = (tel) =>{

        const telValide = /^\d{10}$/.test(tel);

        return telValide;
    }

    const verifierEmail = (courriel) => {

        const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel);

        return emailValide;
    }




    return (
        <div>
            <form method="POST" onSubmit={RegistrationUtilisateur} className="container">
                
                        <center><h1 style={{ background: 'white' }}>Inscription d'un joueur</h1></center>
                    
                                <div className="form-group"></div>
                                <label>Nom :</label>
                                <input type ="text" value={nom} onChange={e=>ajoutNom(e.target.value)} className="form-control"></input>
                                {nomError && <p style={{ color: 'red' }}>{nomError}</p>}
                            
                                <br/>
                        
                                <div className="form-group"></div>
                                <label>Prenom :</label>
                                <input type = "text" value={prenom} onChange={e=>ajoutPrenom(e.target.value)} className="form-control"></input>
                                {prenomError && <p style={{ color: 'red' }}>{prenomError}</p>}
                            
                                <br/>
                        
                                <div className="form-group"></div>
                                <label>Numéro de téléphone</label>
                                <p> Ex: 1234567893</p>
                                <input type="text" value={telephone} onChange={e=>ajoutTelephone(e.target.value)}className="form-control"></input>
                                {telephoneError && <p style={{ color: 'red' }}>{telephoneError}</p>}
                            
                        
                                <br/>
                        
                                <div className="form-group"></div>
                                <label>Date de naissance</label>
                                <p> Ex: YYYY-MM-DD, 2001-05-16</p>
                                <input input type="text" value={date_de_naissance} onChange={e=>ajoutDateDeNaissance(e.target.value)}className="form-control"></input>
                                {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                            
                            
                                <br/>
                        
                                <div className="form-group"></div>
                                <label>Email</label>
                                <input type ="text" value={email} onChange={e=>ajoutEmail(e.target.value)} className="form-control"></input>
                                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            
                                <br/>
                        
                                <div className="form-group"></div>
                                <label>Mots de passe</label>
                                <p> Au moins 9 caractère, une majuscule, une minuscule et un chiffre</p>
                                <input type="text" value={password} onChange={e=>ajoutPassword(e.target.value)} className="form-control"></input>
                                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                                
                        
                    
                    <br/>
                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Inscription</button> 
                        <Link to={'/login'}>
                        <button className="btn btn-danger">Connexion</button>
                        </Link>
                        <Link to={'/'}>
                        <button className="btn btn-red">Acceuil</button>
                        </Link>
                    </div>
                    {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
                
                            
            </form>
            
            {/* ToastContainer afficher le message d'erreur */}
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>

        
    );
}