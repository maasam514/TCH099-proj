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
    const[role_utilisateur, ajoutUtilisateur] = useState('Joueur');

    const navigate = useNavigate();
    

    const RegistrationUtilisateur = async (e) => {
        e.preventDefault();

        if (validationInformation()) {

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

                

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                toast.success('Registration avec succes');
                //RegistrationInfoJoueur();
                navigate('/login');
            } catch (error) {
                console.log('Error:', error); // Log the error to console
                toast.warning('Echouer: ' + error.message);
            }


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
            setDateError('Rentrer votre date de naissance dans ce format: YYYY-MM-DD');
        }
        else {
            setDateError('');
        }

        if (!verifierTelephone(telephone)){
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

        const dateValide = /^\d{4}-\d{2}-\d{2}$/.test(date);

        return dateValide;        
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
        <div className="offset-lg-3 col-lg-6">
            <form method="POST" onSubmit={RegistrationUtilisateur} className="container">
                <div className="card">
                    <div className="card-header">
                        <h1>Registration</h1>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Nom</label>
                                <input value={nom} onChange={e=>ajoutNom(e.target.value)} className="form-control"></input>
                                {nomError && <p style={{ color: 'red' }}>{nomError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Prenom</label>
                                <input value={prenom} onChange={e=>ajoutPrenom(e.target.value)} className="form-control"></input>
                                {prenomError && <p style={{ color: 'red' }}>{prenomError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Numero de telephone</label>
                                <p> Ex: 1234567893</p>
                                <input value={telephone} onChange={e=>ajoutTelephone(e.target.value)}className="form-control"></input>
                                {telephoneError && <p style={{ color: 'red' }}>{telephoneError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Date de naissance</label>
                                <p> Ex: YYYY-MM-DD, 2001-05-16</p>
                                <input value={date_de_naissance} onChange={e=>ajoutDateDeNaissance(e.target.value)}className="form-control"></input>
                                {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Email</label>
                                <input type ="email" value={email} onChange={e=>ajoutEmail(e.target.value)} className="form-control"></input>
                                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Mots de passe</label>
                                <p> Au moins 9 charactere, un majuscule, un minuscule et un chiffre</p>
                                <input value={password} onChange={e=>ajoutPassword(e.target.value)} className="form-control"></input>
                                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Registration</button> 
                        <Link className="btn btn-danger" to={'/login'}>Back</Link>
                    </div>
                </div>
            </form>
            
            {/* ToastContainer afficher le message d'erreur */}
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>

        
    );
}