import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import { Link, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    

    const navigate = useNavigate();
    

    const handleLogin = (e) => {
        e.preventDefault();
        if (validationInformation()){

            //navigate('/info_personnelle'); //verification du lien vers la page d'information du joueur

            //Stocker la valeur de l'email unique dans une variable
            const loginEmail = email;
            // Amene a la section Joueur Information Personnelle
            navigate('/info_personnelle', { state: { email: loginEmail } });
            
            /*
            fetch("http://127.0.0.1:8000/api/joueur/1")
                .then((res) => res.json())
                .then((resp) => {
                    if (Object.keys(resp).length === 0){      //Si le message de reponse retoure rien alors l'email est invalide utilisateur existe pas sur ce nom
                        toast.error(' Entrer un email valid!');
                    } else {
                        if (resp.password === password){      //Si le mots de passe correspond au email on continue vers la section utilisateur joueur
                            toast.success('Success');
                            navigate('/info_personnelle');    
                        } else {
                            toast.error('Mots de Passe Invalide!');  //si le mots de passe est invalide reesayer encore
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login invalide en raison de: ' + err.message);  //si l'erreur n'est pas du au mots de passe ou email mais erreur du site web/serveur
                });

                */
                
        }
    };

    const validationInformation = () => {
        let isValid = true;
        if (email==='' || email === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre email');
        }
        if (password==='' || password === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre mots de passe');
        }
        return isValid;
    };

    return (
        <div className="row">
            <div className="offset-lg-6">
                <form onSubmit={handleLogin} className="container">
                    <div className="card-header">
                        <h2>User Login</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email</label>   
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Mots de passe</label>   
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Login</button> 
                        <Link className="btn btn-success" to={"/register"}>Registration</Link>
                    </div>
                </form>
            </div>
            {/* ToastContainer afficher le message d'erreur */}
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
    );
}
