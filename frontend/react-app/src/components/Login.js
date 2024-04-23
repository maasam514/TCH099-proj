import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';


export default function Login() {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError]= useState('');
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();
    const [estConnecter, setEstConnecter] = useState(false); 

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
                    const { id, token } = responseData;
                    localStorage.setItem('id', id);
                    localStorage.setItem('token', token);
                    setEstConnecter(true); // C'est le status de connexion de l'utilisateur
                    //Dirige vers la premier page de la section Joueur
                    navigate(`/infoPersonnelle`);
                    window.location.reload(); // Refresh the page
                    
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
        } else {
            setEmailError('');
        }
        if (password === '' || password === null) {
            isValid = false;
            setPasswordError('Entrer votre mot de passe');
        } else if (password.length < 9) {
            isValid = false;
            setPasswordError('Le mot de passe doit contenir au moins 9 caractères');
        } else {
            setPasswordError('');
        }
        return isValid;
    };


    return (

     
        <div className="container" style={{ background: 'white' }} >
            <div>   
                <form method="POST" onSubmit={handleLogin} className="container">
                        
                    <center><h1 style={{ background: 'white' }} >Connexion</h1></center>
                        
                        
                            <label style={{ fontSize: '25px' }}>Courriel : </label>
                            <input type = "text" value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                            
                        
                            <label style={{ fontSize: '25px' }} >Mot de passe :</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                            
                        {messageError && <p style={{ color: 'red' }}>{messageError}</p>}
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link to={"/registration"}>
                            <button className="btn btn-danger">Registration</button>
                            </Link>
                        </div>
                    </form>
                </div> 
            
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
        
    );
}
