import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Login.css";

export default function Login() {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError]= useState('');
    const[role_utilisateur, ajoutUtilisateur] = useState('Joueur');
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        //Si le format est bon, on fait le fetch pour verifier si c'est un utilisateur
        if (validationInformation()) {
            try {
                const response = await fetch("https://tch-099-proj.vercel.app/api/api/login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' // Specify content type
                    },
                    body: JSON.stringify({
                        email: email,
                        mot_de_passe: password,
                    })
                });

                const responseData = await response.json();

                //Si c'est un utilisateur on transfert l'information de l'utilisateur dans les autres pages de la section joueur
                if (response.ok) {
                    const { id } = responseData;
                    localStorage.setItem('id', id);
                    //Dirige vers la premier page de la section Joueur
                    navigate('/info_personnelle');
                    
                //Si l'utilisateur n'est pas accepter alors un message erreur va informer l'utilisateur    
                } else {
                    toast.error(responseData.message || 'Login failed');
                    setMessageError(responseData.message);
                }
            } catch (error) {
                console.error('Login error:', error);
                toast.error('Invalid login due to: ' + error.message);
            }
        }
    };


    //Validation du format de l'email et du mot de passe de l'utilisateur
    const validationInformation = () => {
        let isValid = true;
        if (email === '' || email === null) {
            isValid = false;
            
            setEmailError('Entrer votre courriel');
        }
        else{
            setEmailError('');
        }
        if (password === '' || password === null) {
            isValid = false;
            
            setPasswordError('Entrer votre mot de passe');
        }
        else if (password.length < 9 ){
            isValid = false;

            setPasswordError('Le mot de passe doit contenir au moins 9 caractères');
        }
        else {
            setPasswordError('');
        }
        
        
        return isValid;
    };


    return (
        <div className="row">
            <div className="offset-lg-6">
                <form method="POST" onSubmit={handleLogin} className="container">
                    <div className="card-header">
                        <h2>User Login</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Courriel</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    
                        {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        
                              
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <Link className="btn btn-success" to={"/registration"}>Registration</Link>
                    </div>
                </form>
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
    );
}
