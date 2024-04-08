import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


export default function Registration(){

    const[nom, ajoutNom] = useState('');
    const[prenom, ajoutPrenom] = useState('');
    const[telephone, ajoutTelephone] = useState('');
    const[email, ajoutEmail] = useState('');
    const[password, ajoutPassword] = useState('');

    const navigate = useNavigate();
    

    const Registration=(e)=>{
        e.preventDefault();

        if (validationInformation()){
            let objetInformations = {nom, prenom, telephone, email, password};
            
            fetch("http/.....",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(objetInformations)
            }).then((res)=>{
                toast.success('Registration avec succes');
                navigate('/login_pt2');
                
            }).catch((error)=> {
                toast.warning('Echouer: '+ error.message );
            });
            }

    }

    //Faire la validation pour avoir aucun champ vide
    const validationInformation = () => {
        let isValid = true;
        if (email==='' || email === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre Email');
        }
        if (password==='' || password === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre Mots de Passe');
        }

        if (nom==='' || nom === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre Nom');
        }

        if (prenom==='' || prenom === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre Prenom');
        }
        if (telephone==='' || telephone === null){
            isValid = false;
            toast.warning('Oubliez de rentrer votre Numero de Telephone');
        }
        return isValid;
    };



    return (
        <div className="offset-lg-3 col-lg-6">
            <form onSubmit={Registration} className="container">
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
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Prenom</label>
                                <input value={prenom} onChange={e=>ajoutPrenom(e.target.value)} className="form-control"></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Numero de telephone</label>
                                <input value={telephone} onChange={e=>ajoutTelephone(e.target.value)}className="form-control"></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Email</label>
                                <input type ="email" value={email} onChange={e=>ajoutEmail(e.target.value)} className="form-control"></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group"></div>
                                <label>Mots de passe</label>
                                <input value={password} onChange={e=>ajoutPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>

                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Registration</button> 
                        <Link className="btn btn-danger" to={'/login_pt2'}>Back</Link>
                    </div>
                </div>
            </form>
            
            {/* ToastContainer afficher le message d'erreur */}
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>

        
    );
}